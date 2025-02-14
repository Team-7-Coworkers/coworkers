import type { Metadata } from 'next';
import { Slide, ToastContainer } from 'react-toastify';

import siteMetadata from '@/data/siteMetadata';
import KakaoScript from './utils/KakaoScript';

import GNB from './components/Gnb';
import { Providers } from './libs/providers';
import './styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: `${siteMetadata.title} - ${siteMetadata.description}`,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="scroll-smooth pt-[var(--header-height)]">
        <Providers>
          <GNB />
          {children}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            theme="dark"
            transition={Slide}
          />
          <KakaoScript />
        </Providers>
      </body>
    </html>
  );
}
