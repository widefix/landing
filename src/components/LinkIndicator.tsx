// The icon is intentionally not rendered; the marker span drives the shared link styling in layout.scss.
export default function LinkIndicator(_props: { variant?: 'chevron' | 'chain' }) {
  return <span className="link-indicator" aria-hidden="true" />;
}
