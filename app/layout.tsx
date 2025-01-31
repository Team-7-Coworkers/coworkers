import type { Metadata } from 'next';
import siteMetadata from '@/data/siteMetadata';
import './styles/globals.css';
import GNB from './components/Gnb';
import { Providers } from './libs/providers';

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
      <body className="scroll-smooth">
        <Providers>
          <div className="pt-[60px]">
            {children}
            <GNB />
          </div>
        </Providers>
      </body>
    </html>
  );
}
