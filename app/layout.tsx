import type { Metadata } from 'next';
import siteMetadata from '@/data/siteMetadata';
import './styles/globals.css';
import GNB from './components/Gnb';
import { Providers } from './libs/providers';
import KakaoScript from './utils/KakaoScript';

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
          <KakaoScript />
        </Providers>
      </body>
    </html>
  );
}
