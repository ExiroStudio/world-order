import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'World Order — Monopoli Ideologi Dunia',
  description:
    'World Order: Game edukasi papan strategi peradaban antara Liberalisme, Komunisme, Fasisme, dan Kapitalisme.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${fraunces.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#1c1f26] text-[#eae6da] antialiased selection:bg-[#c9a13b] selection:text-[#1c1f26]">
        {children}
      </body>
    </html>
  );
}
