import { ReactNode } from 'react';
import { Metadata } from 'next';

interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: '팀 생성하기',
  description: '새로운 팀을 생성하는 페이지 입니다.',
};

export default function Layout({ children }: Props) {
  return <>{children}</>;
}
