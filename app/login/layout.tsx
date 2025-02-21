'use client';
import { Suspense } from 'react';
import Loading from '@components/Loading';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
