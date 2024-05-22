export default function StripeIntegrationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <head>
        <meta httpEquiv="refresh" content="0; url=/showcases/stripe-integration" />
      </head>
      {children}
    </>
  );
}