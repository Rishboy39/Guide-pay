import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { APP_NAME, TAGLINE } from '@/shared/constants';
import { TextSizeProvider } from '@/contexts/TextSizeContext';

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: APP_NAME,
  description: TAGLINE,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TextSizeProvider>{children}</TextSizeProvider>
      </body>
    </html>
  );
}

