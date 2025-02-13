import type { Metadata } from 'next';
import { Slide, ToastContainer } from 'react-toastify';

import siteMetadata from '@/data/siteMetadata';
import KakaoScript from './utils/KakaoScript';
import { Providers } from './libs/providers';
import { TOAST_CLOSE_TIME } from '@constants/times';

import GNB from './components/Gnb';

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
          {children}
          <GNB />
          <ToastContainer
            position="top-right"
            autoClose={TOAST_CLOSE_TIME.default}
            theme="dark"
            transition={Slide}
          />
          <KakaoScript />
        </Providers>
      </body>
    </html>
  );
}
