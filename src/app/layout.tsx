import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pattern Editor',
  description: 'Interactive editor for mathematical patterns',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
