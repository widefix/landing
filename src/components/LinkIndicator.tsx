export default function LinkIndicator({ variant = 'exit' }: { variant?: 'chevron' | 'exit' }) {
  return (
    <span className="link-indicator" aria-hidden="true">
      <svg width={variant === 'exit' ? 22 : 14} height={variant === 'exit' ? 22 : 14} viewBox={variant === 'exit' ? '0 0 24 24' : '0 0 16 16'} fill="none" focusable="false">
        {variant === 'exit' ? (
          <g stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 4H4v16h6" />
            <path d="M9 12h11m-4-4 4 4-4 4" />
          </g>
        ) : (
          <path d="m6 4 4 4-4 4" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </span>
  );
}
