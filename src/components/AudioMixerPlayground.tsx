'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const STEM_NAMES = ['bass', 'chords', 'melody', 'click'] as const;
type StemName = (typeof STEM_NAMES)[number];
const STEM_URL = (name: StemName) => `/audio/react-native-audio-mixer/${name}.m4a`;
const LOG_LIMIT = 10;

interface TrackState {
  volume: number;
  pan: number;
  muted: boolean;
  solo: boolean;
}

interface LogEntry {
  id: number;
  kind: 'call' | 'event';
  key: string;
  text: string;
}

type Status = 'idle' | 'loading' | 'ready' | 'error';

const initialTracks = (): Record<StemName, TrackState> => ({
  bass: { volume: 0.8, pan: 0, muted: false, solo: false },
  chords: { volume: 0.7, pan: -0.3, muted: false, solo: false },
  melody: { volume: 0.75, pan: 0.3, muted: false, solo: false },
  click: { volume: 0.5, pan: 0, muted: false, solo: false },
});

const formatTime = (seconds: number) => {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

const round = (value: number) => Math.round(value * 100) / 100;

/** The volume a track should play at once mute and solo are applied, as the example app does with setVolume. */
function effectiveVolume(tracks: Record<StemName, TrackState>, name: StemName) {
  const anySolo = STEM_NAMES.some(n => tracks[n].solo);
  const track = tracks[name];
  if (anySolo) return track.solo ? track.volume : 0;
  return track.muted ? 0 : track.volume;
}

/**
 * A browser stand-in for the native mixer: every track is decoded up front and
 * all sources start on the same AudioContext clock, so they stay in sync.
 */
class WebAudioMixer {
  private context: AudioContext;
  private buffers = new Map<StemName, AudioBuffer>();
  private gains = new Map<StemName, GainNode>();
  private panners = new Map<StemName, StereoPannerNode>();
  private analysers = new Map<StemName, AnalyserNode>();
  private sources: AudioBufferSourceNode[] = [];
  private startedAt = 0;
  private offset = 0;
  playing = false;
  duration = 0;

  constructor() {
    this.context = new AudioContext();
  }

  async load(onTrackLoaded: (name: StemName) => void) {
    await Promise.all(STEM_NAMES.map(async name => {
      const response = await fetch(STEM_URL(name));
      if (!response.ok) throw new Error(`HTTP ${response.status} for ${name}.m4a`);
      const buffer = await this.context.decodeAudioData(await response.arrayBuffer());
      this.buffers.set(name, buffer);

      const gain = this.context.createGain();
      const panner = this.context.createStereoPanner();
      const analyser = this.context.createAnalyser();
      analyser.fftSize = 1024;
      gain.connect(panner).connect(analyser).connect(this.context.destination);
      this.gains.set(name, gain);
      this.panners.set(name, panner);
      this.analysers.set(name, analyser);
      onTrackLoaded(name);
    }));
    this.duration = Math.max(...Array.from(this.buffers.values(), b => b.duration));
  }

  get position() {
    if (!this.playing) return this.offset;
    return Math.min(this.duration, this.offset + this.context.currentTime - this.startedAt);
  }

  private startSources() {
    const when = this.context.currentTime + 0.03;
    this.sources = STEM_NAMES.map(name => {
      const source = this.context.createBufferSource();
      source.buffer = this.buffers.get(name)!;
      source.connect(this.gains.get(name)!);
      source.start(when, this.offset);
      return source;
    });
    this.startedAt = when;
  }

  private stopSources() {
    this.sources.forEach(source => {
      source.onended = null;
      try { source.stop(); } catch { /* already stopped */ }
      source.disconnect();
    });
    this.sources = [];
  }

  async togglePlay() {
    if (this.playing) {
      this.offset = this.position;
      this.stopSources();
      this.playing = false;
      return;
    }
    if (this.context.state === 'suspended') await this.context.resume();
    if (this.offset >= this.duration) this.offset = 0;
    this.startSources();
    this.playing = true;
  }

  pause() {
    if (this.playing) void this.togglePlay();
  }

  seek(progress: number) {
    this.offset = Math.min(1, Math.max(0, progress)) * this.duration;
    if (this.playing) {
      this.stopSources();
      this.startSources();
    }
  }

  setVolume(name: StemName, volume: number) {
    this.gains.get(name)?.gain.setTargetAtTime(volume, this.context.currentTime, 0.015);
  }

  setPan(name: StemName, pan: number) {
    this.panners.get(name)?.pan.setTargetAtTime(pan, this.context.currentTime, 0.015);
  }

  /** RMS level per track, scaled to 0-1 for the meters. */
  amplitudes() {
    const sample = new Float32Array(1024);
    const levels = {} as Record<StemName, number>;
    STEM_NAMES.forEach(name => {
      const analyser = this.analysers.get(name);
      if (!analyser || !this.playing) { levels[name] = 0; return; }
      analyser.getFloatTimeDomainData(sample);
      let sum = 0;
      for (let i = 0; i < sample.length; i += 1) sum += sample[i] * sample[i];
      levels[name] = Math.min(1, Math.sqrt(sum / sample.length) * 4);
    });
    return levels;
  }

  reset() {
    this.stopSources();
    this.playing = false;
    void this.context.close();
  }
}

export default function AudioMixerPlayground() {
  const mixer = useRef<WebAudioMixer | null>(null);
  const logId = useRef(0);
  const [status, setStatus] = useState<Status>('idle');
  const [loaded, setLoaded] = useState(0);
  const [error, setError] = useState('');
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [tracks, setTracks] = useState(initialTracks);
  const [levels, setLevels] = useState<Record<StemName, number>>({ bass: 0, chords: 0, melody: 0, click: 0 });
  const [log, setLog] = useState<LogEntry[]>([]);

  // Repeated calls for the same control replace the previous line, so dragging a slider does not flood the log.
  const addLog = useCallback((kind: LogEntry['kind'], key: string, text: string) => {
    setLog(current => {
      const entry = { id: ++logId.current, kind, key, text };
      if (current[0]?.key === key) return [entry, ...current.slice(1)];
      return [entry, ...current].slice(0, LOG_LIMIT);
    });
  }, []);

  useEffect(() => () => mixer.current?.reset(), []);

  // Progress and level meters, about every 100 ms while playing, like the PlaybackProgress and TracksAmplitudes events.
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      const current = mixer.current;
      if (!current) return;
      setPosition(current.position);
      setLevels(current.amplitudes());
      // The demo rewinds at the end of the song so it can be played again.
      if (current.position >= current.duration) {
        current.pause();
        current.seek(0);
        setPlaying(false);
        setPosition(0);
        setLevels({ bass: 0, chords: 0, melody: 0, click: 0 });
      }
    }, 100);
    return () => window.clearInterval(timer);
  }, [playing]);

  // Like the native module in the background, pause while the page is hidden and resume when it returns.
  useEffect(() => {
    let pausedInBackground = false;
    const onVisibility = () => {
      const current = mixer.current;
      if (!current) return;
      if (document.hidden && current.playing) {
        current.pause();
        pausedInBackground = true;
        setPlaying(false);
      } else if (!document.hidden && pausedInBackground) {
        pausedInBackground = false;
        void current.togglePlay().then(() => setPlaying(current.playing));
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const load = async () => {
    setStatus('loading');
    setError('');
    setLoaded(0);
    addLog('call', 'load', `AudioMixer.load([${STEM_NAMES.map(n => `'${n}.m4a'`).join(', ')}])`);
    addLog('event', 'start', "← DownloadStart { status: 'DownloadStart' }");
    try {
      const instance = new WebAudioMixer();
      mixer.current = instance;
      await instance.load(name => {
        setLoaded(count => count + 1);
        addLog('event', `loaded-${name}`, `← TrackLoaded { name: '${name}' }`);
      });
      STEM_NAMES.forEach(name => {
        instance.setVolume(name, effectiveVolume(tracks, name));
        instance.setPan(name, tracks[name].pan);
      });
      setDuration(instance.duration);
      setStatus('ready');
      addLog('event', 'complete', '← DownloadComplete { …4 tracks }');
      addLog('event', 'duration', `← MixerDurationSet ${round(instance.duration)}`);
    } catch (cause) {
      mixer.current?.reset();
      mixer.current = null;
      setStatus('error');
      setError(cause instanceof Error ? cause.message : 'The stems could not be loaded');
      addLog('event', 'error', '← DownloadErrors { errMsg }');
    }
  };

  const togglePlay = async () => {
    const current = mixer.current;
    if (!current) return;
    await current.togglePlay();
    setPlaying(current.playing);
    if (!current.playing) setLevels({ bass: 0, chords: 0, melody: 0, click: 0 });
    addLog('call', 'toggle', 'AudioMixer.togglePlay()');
  };

  const seek = (progress: number) => {
    mixer.current?.seek(progress);
    setPosition(progress * duration);
    addLog('call', 'seek', `AudioMixer.seek(${round(progress)})`);
  };

  // Applies a change and sends setVolume for every track whose audible volume changed.
  const updateTracks = (change: (current: Record<StemName, TrackState>) => Record<StemName, TrackState>) => {
    const next = change(tracks);
    STEM_NAMES.forEach(name => {
      const before = effectiveVolume(tracks, name);
      const after = effectiveVolume(next, name);
      if (before !== after) {
        mixer.current?.setVolume(name, after);
        addLog('call', `volume-${name}`, `AudioMixer.setVolume(tracks.${name}, ${round(after)})`);
      }
    });
    setTracks(next);
  };

  const setPan = (name: StemName, pan: number) => {
    mixer.current?.setPan(name, pan);
    setTracks(current => ({ ...current, [name]: { ...current[name], pan } }));
    addLog('call', `pan-${name}`, `AudioMixer.setPan(tracks.${name}, ${round(pan)})`);
  };

  const ready = status === 'ready';
  const progress = duration ? position / duration : 0;

  return (
    <div className="mixer-playground">
      <div className="mixer-device" aria-label="Interactive audio mixer demo">
        <div className="mixer-device-header">
          <div>
            <span>Demo song · 4 stems</span>
            <strong>Synthesized in C major, 100 BPM</strong>
          </div>
          {ready && (
            <button type="button" className="mixer-play" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
              {playing ? (
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5v14M16 5v14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /></svg>
              )}
            </button>
          )}
        </div>

        {status !== 'ready' ? (
          <div className="mixer-load">
            <p>
              {status === 'loading'
                ? `Loading stems: ${loaded} of ${STEM_NAMES.length}`
                : 'Load four synthesized stems (about 600 KB) and mix them in your browser.'}
            </p>
            {status === 'error' && <p className="mixer-error" role="alert">{error}. Please try again.</p>}
            <button type="button" className="schema-button" onClick={load} disabled={status === 'loading'}>
              {status === 'loading' ? 'Loading…' : 'Load the demo song'}
            </button>
          </div>
        ) : (
          <>
            <div className="mixer-transport">
              <span>{formatTime(position)}</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.001}
                value={progress}
                onChange={event => seek(Number(event.target.value))}
                aria-label="Playback position"
                aria-valuetext={`${formatTime(position)} of ${formatTime(duration)}`}
              />
              <span>{formatTime(duration)}</span>
            </div>

            <ul className="mixer-tracks">
              {STEM_NAMES.map(name => {
                const track = tracks[name];
                return (
                  <li key={name}>
                    <div className="mixer-track-heading">
                      <strong>{name}</strong>
                      <div className="mixer-track-buttons">
                        <button
                          type="button"
                          className="mixer-toggle mixer-toggle-mute"
                          aria-pressed={track.muted}
                          aria-label={`Mute ${name}`}
                          onClick={() => updateTracks(current => ({ ...current, [name]: { ...current[name], muted: !current[name].muted } }))}
                        >M</button>
                        <button
                          type="button"
                          className="mixer-toggle mixer-toggle-solo"
                          aria-pressed={track.solo}
                          aria-label={`Solo ${name}`}
                          onClick={() => updateTracks(current => ({ ...current, [name]: { ...current[name], solo: !current[name].solo } }))}
                        >S</button>
                      </div>
                    </div>
                    <div className="mixer-meter" aria-hidden="true"><span style={{ transform: `scaleX(${levels[name]})` }} /></div>
                    <label>
                      <span>Volume</span>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={track.volume}
                        onChange={event => {
                          const volume = Number(event.target.value);
                          updateTracks(current => ({ ...current, [name]: { ...current[name], volume } }));
                        }}
                        aria-label={`${name} volume`}
                      />
                    </label>
                    <label>
                      <span>Pan</span>
                      <input
                        type="range"
                        min={-1}
                        max={1}
                        step={0.01}
                        value={track.pan}
                        onChange={event => setPan(name, Number(event.target.value))}
                        onDoubleClick={() => setPan(name, 0)}
                        aria-label={`${name} pan`}
                        aria-valuetext={track.pan === 0 ? 'Center' : `${Math.round(Math.abs(track.pan) * 100)}% ${track.pan < 0 ? 'left' : 'right'}`}
                      />
                    </label>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>

      <div className="mixer-log">
        <div className="mixer-log-heading">
          <span>Equivalent library calls</span>
          <small>Events start with ←</small>
        </div>
        <ol aria-live="polite" aria-relevant="additions">
          {log.length === 0 && (
            <li className="mixer-log-empty">
              <button type="button" className="mixer-log-load" onClick={load}>Load the demo song</button>, then use the controls to see the matching AudioMixer calls and events.
            </li>
          )}
          {log.map(entry => (
            <li key={entry.id} className={`mixer-log-${entry.kind}`}><code>{entry.text}</code></li>
          ))}
        </ol>
      </div>
    </div>
  );
}
