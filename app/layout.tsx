import React from 'react';
import '../styles/index.css';
import Navigation from '../components/navigation';
import Footer from '../components/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Esports Gaming News, Reviews, and More | Gabenismen Gaming',
  description:
    'Gabenismen Gaming is your source for the latest esports news, reviews, and more. Stay up to date with the latest in gaming and esports.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-gray-900'>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
