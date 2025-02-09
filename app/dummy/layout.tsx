import { ReactNode } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: '테스트 페이지',
};

// aside nav
const PAGES = ['modal', 'dropdown', 'loading', 'button', 'textfield'];

export default function Layout({ children }: Props) {
  // 개발 환경에서만 접근 가능하도록 수정
  if (process.env.NODE_ENV !== 'development') {
    return notFound();
  }

  return (
    <div className="container flex flex-col gap-4 py-6 sm:flex-row">
      <aside className="w-full flex-none self-start rounded-xl bg-b-secondary p-4 sm:w-1/4">
        <ul className="flex gap-1 sm:flex-col">
          {PAGES.map((name) => (
            <li key={name}>
              <Link
                href={`/dummy/${name}`}
                className="text-button block rounded-md px-2 py-1 hover:bg-b-tertiary"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <div className="flex-1">{children}</div>
    </div>
  );
}
