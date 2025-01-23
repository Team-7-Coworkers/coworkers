import React, { ReactNode } from 'react';
import useClickOutside from '@/app/hooks/useClickOutside';
import DropdownButton from './DropdownButton';
import DropdownMenu from './DropdownMenu';
import DropdownMenuItem from './DropdownMenuItem';

interface DropdownProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Dropdown({ children, onClose }: DropdownProps) {
  // 외부 클릭 시 닫히도록
  const ref = useClickOutside(onClose);

  return (
    <div
      ref={ref}
      className="relative"
    >
      {children}
    </div>
  );
}

Dropdown.Button = DropdownButton;
Dropdown.Menu = DropdownMenu;
Dropdown.MenuItem = DropdownMenuItem;
