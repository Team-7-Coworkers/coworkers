import { ReactNode } from 'react';
import { Metadata } from 'next';

interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: '할 일 목록 페이지 | Coworkers',
  /*  root 레이아웃이 상속이 안 되는 것 같더라고요...? 
  그래서 Coworkers를 직접 적었는데 어떻게 해결하는지 아시는 분 계신가요?*/
  description: '할 일 목록 페이지 입니다. 할 일과 일정을 관리하세요.',
};

export default function Layout({ children }: Props) {
  return <>{children}</>;
}
