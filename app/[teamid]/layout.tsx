import { ReactNode } from 'react';
import { Metadata } from 'next';

interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: '팀 페이지',
  description: '팀 페이지 입니다. 할 일 목록 및 맴버를 관리하세요.',
};

export default function Layout({ children }: Props) {
  return <>{children}</>;
}
