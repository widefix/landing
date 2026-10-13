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
        link.textContent = 'Watch the product walkthrough →';
        video.replaceWith(link);
      });
      copy.querySelectorAll<HTMLElement>('.schema-reddit-embed').forEach(embed => {
        const iframe = embed.querySelector('iframe');
        const fallback = embed.querySelector<HTMLAnchorElement>('a[href]');
        const source = iframe?.src;
        const url = source ? new URL(source) : null;
        const link = document.createElement('a');
        link.href = url ? `https://www.reddit.com${url.pathname}` : fallback?.href || '';
        link.textContent = 'Read the developer’s comment on Reddit →';
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
