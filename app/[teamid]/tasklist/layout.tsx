import { ReactNode } from 'react';
import { Metadata } from 'next';

interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: '할 일 목록 페이지 | Coworkers',
  description: '할 일 목록 페이지 입니다. 할 일과 일정을 관리하세요.',
};

export default function Layout({ children }: Props) {
  return <>{children}</>;
}
