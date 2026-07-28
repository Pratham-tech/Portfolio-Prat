import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pratham Dang',
  description: 'Computational Data Science & Business Analytics @ University of Sydney. Dalyell Scholar.',
  authors: [{ name: 'Pratham Dang' }],
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
