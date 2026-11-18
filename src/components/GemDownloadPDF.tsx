'use client';

import { useState } from 'react';

export default function GemDownloadPDF({ filename }: { filename: string }) {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');

  async function download() {
    if (downloading) return;
    setDownloading(true);
    setError('');
    try {
      const original = document.querySelector<HTMLElement>('main.actual-db-schema-page');
      if (!original) throw new Error('Page not found');
      const copy = original.cloneNode(true) as HTMLElement;
      copy.querySelectorAll('[data-pdf-exclude]').forEach(element => element.remove());
      // Reflect calculator inputs in the serialized export, including edits.
      const inputs = original.querySelectorAll<HTMLInputElement>('input');
      copy.querySelectorAll<HTMLInputElement>('input').forEach((input, index) => {
        input.setAttribute('value', inputs[index].value);
      });
      // Embedded media remains available through clickable original-source links.
      copy.querySelectorAll<HTMLVideoElement>('video').forEach(video => {
        const source = video.querySelector('source');
        if (!source) return;
        const link = document.createElement('a');
        link.href = new URL(source.src, window.location.href).href;
        link.innerHTML = 'Watch the product walkthrough <span class="link-indicator" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" focusable="false"><g stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M10 4H4v16h6"></path><path d="M9 12h11m-4-4 4 4-4 4"></path></g></svg></span>';
        video.replaceWith(link);
      });
      copy.querySelectorAll<HTMLElement>('.schema-reddit-embed').forEach(embed => {
        const iframe = embed.querySelector('iframe');
        const fallback = embed.querySelector<HTMLAnchorElement>('a[href]');
        const source = iframe?.src;
        const url = source ? new URL(source) : null;
        const link = document.createElement('a');
        link.href = url ? `https://www.reddit.com${url.pathname}` : fallback?.href || '';
        link.innerHTML = 'Read the developer’s comment on Reddit <span class="link-indicator" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" focusable="false"><g stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M10 4H4v16h6"></path><path d="M9 12h11m-4-4 4 4-4 4"></path></g></svg></span>';
        embed.replaceChildren(link);
      });
      const { downloadShowcasePDF } = await import('@/lib/showcasePdf');
      await downloadShowcasePDF(copy.outerHTML, filename, 'main.actual-db-schema-page');
    } catch {
      setError('Could not create the PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="schema-pdf-download" data-pdf-exclude>
      <button type="button" className="schema-text-link" onClick={download} disabled={downloading} aria-busy={downloading}>
        {downloading ? 'Preparing PDF…' : 'Download PDF ↓'}
      </button>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
