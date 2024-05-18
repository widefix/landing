import Link from 'next/link'

export default function NotFoundPage() {
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
