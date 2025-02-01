import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const LINKS = [
  {
    href: '/dummy/modal',
    text: 'modal',
  },
  {
    href: '/dummy/dropdown',
    text: 'dropdown',
  },
  {
    href: '/dummy/loading',
    text: 'loading',
  },
  {
    href: '/dummy/button',
    text: 'button',
  },
];

export default function Layout({ children }: Props) {
  return (
    <div className="container flex gap-4 py-6">
      <aside className="w-1/4 flex-none self-start rounded-xl bg-b-secondary p-4">
        <ul className="space-y-1">
          {LINKS.map(({ href, text }) => (
            <li key={text}>
              <Link
                href={href}
                className="text-button block rounded-md px-2 py-1 hover:bg-b-tertiary"
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <div className="flex-1">{children}</div>
    </div>
  );
}
