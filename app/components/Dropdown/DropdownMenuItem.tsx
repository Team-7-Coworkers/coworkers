import React, { ReactNode } from 'react';

interface DropdownMenuItemProps {
  children: ReactNode;
  onClick?: () => void;
}

const DropdownMenuItem = ({ children, onClick }: DropdownMenuItemProps) => {
  return (
    <div
      className="cursor-pointer rounded-[11px] bg-b-secondary px-[16px] pb-[11px] pt-[12px] text-md transition-colors duration-200 hover:bg-b-tertiary active:scale-95"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default DropdownMenuItem;
