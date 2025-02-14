import { ReactNode } from 'react';
import { Metadata } from 'next';

interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: '마이 히스토리',
  description: '마이 히스토리 페이지 입니다. 완료한 일을 확인하세요.',
};

export default function Layout({ children }: Props) {
  return <>{children}</>;
}
