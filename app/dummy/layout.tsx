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
  {
    href: '/dummy/textfield',
    text: 'textfield',
  },
];

export default function Layout({ children }: Props) {
  return (
    <div className="container flex flex-col gap-4 py-6 sm:flex-row">
      <aside className="w-full flex-none self-start rounded-xl bg-b-secondary p-4 sm:w-1/4">
        <ul className="flex gap-1 sm:flex-col">
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
