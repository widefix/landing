export default function LinkIndicator({ variant = 'chain' }: { variant?: 'chevron' | 'chain' }) {
  return (
    <span className="link-indicator" aria-hidden="true">
      <svg width={variant === 'chain' ? 22 : 14} height={variant === 'chain' ? 22 : 14} viewBox={variant === 'chain' ? '0 0 24 24' : '0 0 16 16'} fill="none" focusable="false">
        {variant === 'chain' ? (
          <g stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </g>
        ) : (
          <path d="m6 4 4 4-4 4" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </span>
  );
}
