'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NotFoundPage() {
  const router = useRouter();

  useEffect(() => {
    const redirects: { [key: string]: string } = {
      '/showcase-1-stripe-integration': '/showcases/stripe-integration',
      '/showcase-2-prevent-account-sharing': '/showcases/prevent-account-sharing'
    };

    const path = window.location.pathname;
    if (redirects[path]) {
      router.replace(redirects[path]);
    }
  }, [router]);

  return (
    <main className="not-found">
      <div className="container">
        <h1 className="title">404 - Page Not Found</h1>
        <p className="message">
          Oops! The page you are looking for does not exist.
        </p>
        <Link href="/" className="link">Go back to the homepage</Link>
      </div>
    </main>
  );
}
