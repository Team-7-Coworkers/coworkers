import type { Metadata } from 'next';
import siteMetadata from '@/data/siteMetadata';
import './styles/globals.css';
import GNB from './components/Gnb';

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
        <div className="pt-[60px]">{children}</div>
        <GNB />
      </body>
    </html>
  );
}
