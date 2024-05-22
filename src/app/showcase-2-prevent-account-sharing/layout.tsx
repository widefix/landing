export default function PreventAccountSharingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <head>
        <meta httpEquiv="refresh" content="0; url=/showcases/prevent-account-sharing" />
      </head>
      {children}
    </>
  );
}