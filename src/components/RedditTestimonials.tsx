'use client';

import { useEffect } from 'react';

// Balance longer discussions with short reactions in independently stacked columns.
const commentColumns = [
  [
    ['1nr809c', 'ngcv6qh'],
    ['1dgdhc7', 'l8pezbv'],
    ['1x3g8jn', 'pfcy015'],
  ],
  [
    ['1x3g8jn', 'pfcd06n'],
    ['1i26fvd', 'm7cjcm1'],
    ['1i26fvd', 'm7f8v5k'],
  ],
];

export default function RedditTestimonials() {
  useEffect(() => {
    // Reddit replaces its blockquotes with responsive, automatically resized iframes.
    // Load on each mount so navigation back to this page initializes fresh embeds.
    const script = document.createElement('script');
    script.src = 'https://embed.reddit.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <div className="schema-testimonial-grid">
      {commentColumns.map((comments, column) => (
        <div className="schema-testimonial-column" key={column}>
          {comments.map(([post, comment]) => {
        const url = `https://www.reddit.com/r/rails/comments/${post}/comment/${comment}/`;
        return (
          <div className="schema-reddit-embed" key={comment}>
            <blockquote className="reddit-embed-bq" data-embed-theme="light" data-embed-showtitle="false" data-embed-showmedia="false" data-embed-height="320">
              <a href={url}>Read this comment on Reddit</a>
            </blockquote>
          </div>
        );
          })}
        </div>
      ))}
    </div>
  );
}
