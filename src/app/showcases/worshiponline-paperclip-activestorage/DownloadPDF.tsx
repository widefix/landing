'use client';

import { useRef, useState } from 'react';
import styles from './worshiponline.module.scss';

export default function DownloadPDF({ filename = 'worshiponline-paperclip-activestorage.pdf' }: { filename?: string }) {
  const button = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function download() {
    const main = button.current?.closest('main');
    if (!main || loading) return;

    setLoading(true);
    setError('');
    try {
      const copy = main.cloneNode(true) as HTMLElement;
      copy.classList.add('showcase-pdf');
      copy.querySelectorAll('[data-pdf-exclude]').forEach(element => element.remove());
      const { downloadShowcasePDF } = await import('@/lib/showcasePdf');
      await downloadShowcasePDF(copy.outerHTML, filename);
    } catch {
      setError('Could not create the PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        ref={button}
        type="button"
        className={`${styles.secondaryLink} ${styles.downloadButton}`}
        onClick={download}
        disabled={loading}
        data-pdf-exclude
      >
        {loading ? 'Preparing PDF…' : 'Download PDF'}
      </button>
      {error && <span role="alert" className={styles.downloadError} data-pdf-exclude>{error}</span>}
    </>
  );
}
