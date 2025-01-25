import React, { ReactNode, useState, ReactElement } from 'react';
import useClickOutside from '@/app/hooks/useClickOutside';
import DropdownButton, { DropdownButtonProps } from './DropdownButton';
import DropdownMenu, { DropdownMenuProps } from './DropdownMenu';
import DropdownMenuItem from './DropdownMenuItem';

interface DropdownProps {
  children: ReactNode;
  className?: string;
}

export default function Dropdown({ children, className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  // 드롭다운 열기/닫기 토글 함수
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // 드롭다운 닫기 함수
  const closeDropdown = () => {
    setIsOpen(false);
  };

  // 외부 클릭 시 닫히도록
  const ref = useClickOutside(closeDropdown);
  console.log('Dropdown children:', children);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DropdownButton) {
          // DropdownButton에 onClick을 전달
          return React.cloneElement(
            child as ReactElement<DropdownButtonProps>,
            {
              onClick: toggleDropdown,
            }
          );
        }

        if (React.isValidElement(child) && child.type === DropdownMenu) {
          return React.cloneElement(child as ReactElement<DropdownMenuProps>, {
            isOpen, // isOpen 상태를 전달
            closeDropdown,
          });
        }

        // if (React.isValidElement(child) && child.type === DropdownMenuItem) {
        //   // DropdownMenuItem에 closeDropdown 전달
        //   console.log('Passing closeDropdown:', closeDropdown);
        //   return React.cloneElement(
        //     child as ReactElement<DropdownMenuItemProps>,
        //     {
        //       closeDropdown,
        //     }
        //   );
        // }

        return child;
      })}
    </div>
  );
}

Dropdown.Button = DropdownButton;
Dropdown.Menu = DropdownMenu;
Dropdown.MenuItem = DropdownMenuItem;
