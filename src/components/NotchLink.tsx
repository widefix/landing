import Link from 'next/link';
import type { ComponentProps } from 'react';
import LinkIndicator from '@/components/LinkIndicator';
import styles from './NotchLink.module.css';

/** Compact resource link with an exit doorway and shared chevron. */
export default function NotchLink({ children, className, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link {...props} className={[styles.link, className].filter(Boolean).join(' ')}>
      <span>{children}</span>
      <span className={styles.notch} aria-hidden="true">
        <LinkIndicator variant="exit" />
      </span>
    </Link>
  );
}
