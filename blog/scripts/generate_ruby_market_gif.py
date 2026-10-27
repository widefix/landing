"""Render an illustrative Ruby labor-market GIF with librsvg and ImageMagick.

Run from the blog directory: python3 scripts/generate_ruby_market_gif.py
Curve positions are author-defined scenarios, not fitted historical estimates.
The separate HN counts are annual Ruby mentions; 2026 is partial through September.
"""

from html import escape
from pathlib import Path
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
YEARS = list(range(2017, 2027))
MENTIONS = [420, 310, 217, 174, 201, 107, 64, 43, 38, 32]
# Hypothetical demand intercept and supply intercept in schematic coordinates.
# These illustrate the article's hypothesis; neither series is measured data.
DEMAND = [86, 83, 79, 75, 80, 73, 66, 61, 57, 60]
SUPPLY = [14, 13, 12, 11, 10, 7, 3, -1, -5, -9]
GREEN, RED, INK = '#23745c', '#bc4053', '#203b35'


def render(index, fraction):
    previous = max(0, index - 1)
    d = DEMAND[previous] + (DEMAND[index] - DEMAND[previous]) * fraction
    s = SUPPLY[previous] + (SUPPLY[index] - SUPPLY[previous]) * fraction
    # wage = d - .65*q; wage = s + .65*q
    q, wage = (d - s) / 1.3, (d + s) / 2
    x = lambda value: 115 + value * 6.3
    y = lambda value: 610 - value * 4.6
    parts = [f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="830" viewBox="0 0 1200 830">
    <rect width="1200" height="830" fill="#f5f3ec"/>
    <g font-family="Arial" fill="{INK}">
    <text x="45" y="43" font-size="16" letter-spacing="2">WIDEFIX / RUBY + RAILS</text>
    <text x="45" y="88" font-size="32" font-weight="bold">More available capacity changes the balance</text>
    <text x="45" y="119" font-size="18">Illustrative 2017–2026 scenario · curves are hypotheses, not historical estimates</text>
    <rect x="835" y="151" width="320" height="476" rx="16" fill="#e5ebe2"/>
    <text x="861" y="185" font-size="15" letter-spacing="1">SCENARIO YEAR</text>
    <text x="857" y="250" font-size="64" font-weight="bold">{YEARS[index]}</text>
    <text x="861" y="287" font-size="17">{'Starting reference' if index == 0 else 'Relative to the 2017 reference'}</text>
    <path d="M115 162V610H765" fill="none" stroke="{INK}" stroke-width="2"/>
    <text x="116" y="150" font-size="17">Compensation</text>
    <text x="350" y="652" font-size="17">Ruby/Rails labor capacity</text>
    <text x="116" y="635" font-size="13" fill="#61736b">Less</text>
    <text x="730" y="635" font-size="13" fill="#61736b">More</text>
    <text transform="translate(88 420) rotate(-90)" font-size="13" fill="#61736b">Lower                         Higher</text>''']

    def line(x1, y1, x2, y2, color, width=3, extra=''):
        parts.append(f'<path d="M{x1:.2f} {y1:.2f}L{x2:.2f} {y2:.2f}" fill="none" stroke="{color}" stroke-width="{width}" {extra}/>')

    for level in (20, 40, 60, 80):
        line(x(0), y(level), x(100), y(level), '#dde2d8', 1)
    for intercept, slope in ((86, -.65), (14, .65)):
        line(x(0), y(intercept), x(100), y(intercept + slope*100), '#9ba79e', 2, 'stroke-dasharray="7 7"')
    end = min(100, d/.65)
    line(x(0), y(d), x(end), y(d-.65*end), RED, 4)
    # Clip supply to nonnegative wages.
    start = max(0, -s/.65)
    line(x(start), y(s+.65*start), x(100), y(s+65), GREEN, 4)
    line(x(0), y(wage), x(q), y(wage), '#bf7d27', 2, 'stroke-dasharray="5 5"')
    line(x(q), y(0), x(q), y(wage), '#bf7d27', 2, 'stroke-dasharray="5 5"')
    parts.append(f'<circle cx="{x(q):.2f}" cy="{y(wage):.2f}" r="8" fill="#bf7d27" stroke="#f5f3ec" stroke-width="3"/>')
    parts.append(f'<text x="{x(q)+13:.2f}" y="{y(wage)-13:.2f}" font-size="16" fill="#925e1d">Model equilibrium</text>')
    # At the original wage, the widening horizontal gap is excess supply.
    if index > 0:
        qd, qs = (d-50)/.65, (50-s)/.65
        line(x(qd), y(50), x(qs), y(50), '#bf7d27', 3)
        for qty in (qd, qs):
            line(x(qty), y(50)-6, x(qty), y(50)+6, '#bf7d27', 2)
        parts.append(f'<text x="{x(qd):.2f}" y="{y(50)-12:.2f}" font-size="14" fill="#925e1d">Excess supply at the 2017 model wage</text>')

    for yy, color, title, detail in (
        (330, GREEN, 'Supply: developers', 'Starting available capacity' if index == 0 else 'Assumed available capacity rises'),
        (400, RED, 'Demand: employers', 'Starting employer demand' if index == 0 else 'Illustrative weaker hiring demand'),
        (470, '#bf7d27', 'Compensation pressure', 'Starting model clearing wage' if index == 0 else 'Lower model clearing wage'),
        (540, '#9ba79e', 'Dashed: 2017 reference', 'No measured wage or headcount'),
    ):
        line(861, yy-5, 886, yy-5, color, 4)
        parts.append(f'<text x="897" y="{yy}" font-size="17" font-weight="bold">{escape(title)}</text>')
        parts.append(f'<text x="861" y="{yy+26}" font-size="15">{escape(detail)}</text>')

    parts.append('<path d="M115 691H1140" stroke="#bcc8bc" stroke-width="2"/>')
    for i, year in enumerate(YEARS):
        tx = 115 + i * (1025/9)
        color = INK if i <= index else '#929c93'
        parts.append(f'<circle cx="{tx:.1f}" cy="691" r="{7 if i == index else 3}" fill="{GREEN if i == index else color}"/>')
        parts.append(f'<text x="{tx:.1f}" y="720" text-anchor="middle" fill="{color}" font-size="16">{year}</text>')
    parts.append(f'''<text x="45" y="766" font-size="18" font-weight="bold">Observed context: HN Ruby mentions in {YEARS[index]}: {MENTIONS[index]}{' (Jan–Sep only)' if index == 9 else ' (full year)'}</text>
    <text x="45" y="794" font-size="15">Source: HN Hiring Index, Ruby page · mentions measure a hiring signal, not developer supply or wages</text>
    </g></svg>''')
    return ''.join(parts)


def main():
    output = ROOT / 'images/ruby-supply-demand-2017-2026.gif'
    with tempfile.TemporaryDirectory(prefix='ruby-market-animation-') as work:
        frames, durations = [], []
        for index in range(len(YEARS)):
            steps = [1.0] if index == 0 else [i/8 for i in range(1, 9)]
            for fraction in steps:
                number = len(frames)
                svg = Path(work) / f'{number:03}.svg'
                png = svg.with_suffix('.png')
                svg.write_text(render(index, fraction))
                subprocess.run(['rsvg-convert', '-o', str(png), str(svg)], check=True)
                frames.append(png)
                durations.append(160 if index == 9 and fraction == 1 else 110 if fraction == 1 else 9)
        command = ['magick']
        for frame, duration in zip(frames, durations):
            command += ['-delay', str(duration), str(frame)]
        command += ['-loop', '0', '-colors', '96', '-layers', 'Optimize', str(output)]
        subprocess.run(command, check=True)
        # A static final frame supports a reduced-motion fallback in the article.
        subprocess.run(['magick', str(frames[-1]), str(output.with_suffix('.png'))], check=True)
    print(f'Generated {output.name}: {len(frames)} frames, {output.stat().st_size:,} bytes')


if __name__ == '__main__':
    main()
