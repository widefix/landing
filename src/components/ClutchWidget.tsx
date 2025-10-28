'use client';

export default function ClutchWidget() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<script type="text/javascript" src="https://widget.clutch.co/static/js/widget.js"></script><div class="clutch-widget" data-url="https://widget.clutch.co" data-widget-type="12" data-height="375" data-nofollow="false" data-expandifr="true" data-scale="100" data-reviews="225249,177597,167361,155930,29711,80319,67459" data-clutchcompany-id="1340654"></div>`
      }}
    />
  );
}
