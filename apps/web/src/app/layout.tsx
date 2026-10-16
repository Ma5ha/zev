import './global.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: { default: 'ZEV — pregled vaše zgrade', template: '%s | ZEV' },
  description: 'Aplikacija za transparentno upravljanje zajednicom etažnih vlasnika. Isprobajte početne preglede sa izmišljenim podacima.',
  robots: { index: false, follow: false },
  icons: { icon: '/icon.svg' },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="sr-Latn-BA">
      <body>
        <a href="#sadrzaj" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-surface focus:p-4">Preskoči na sadržaj</a>
        {children}
      </body>
    </html>
  )
}
