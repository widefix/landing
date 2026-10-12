'use client';

import Script from 'next/script';
import { useEffect } from 'react';

function initializeReviews() {
  const clutchWindow = window as Window & { CLUTCHCO?: { Init: () => void } };
  clutchWindow.CLUTCHCO?.Init();
}

export default function ClutchWidget() {
  // Reinitialize when a client-side navigation mounts a fresh widget container.
  useEffect(initializeReviews, []);

  return (
    <>
      <div className="clutch-widget" data-url="https://widget.clutch.co"
        data-widget-type="12" data-height="375" data-nofollow="false"
        data-expandifr="true" data-scale="100"
        data-reviews="428739,433606,431257,419114,225249,29711,80319"
        data-clutchcompany-id="1340654" />
      <Script src="https://widget.clutch.co/static/js/widget.js"
        strategy="afterInteractive" onReady={initializeReviews} />
    </>
  );
}
