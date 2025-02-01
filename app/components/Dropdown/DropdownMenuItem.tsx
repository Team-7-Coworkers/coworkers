import React, { ReactNode } from 'react';

export interface DropdownMenuItemProps {
  children: ReactNode;
  onClick?: () => void;
  className?:string;
  closeDropdown?: () => void;
}

const DropdownMenuItem = ({
  children,
  onClick,
  className,
  closeDropdown,
}: DropdownMenuItemProps) => {
  const handleClick = () => {
    if (closeDropdown) {
      closeDropdown();
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`w-full cursor-pointer rounded-[11px] border-none bg-b-secondary bg-none px-[16px] pb-[11px] pt-[12px] text-md transition-colors duration-200 hover:bg-b-tertiary focus:outline-none active:scale-95 ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default DropdownMenuItem;
