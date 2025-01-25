import React, { ReactNode } from 'react';

export interface DropdownMenuItemProps {
  children: ReactNode;
  onClick?: () => void;
  closeDropdown?: () => void;
}

const DropdownMenuItem = ({
  children,
  onClick,
  closeDropdown,
}: DropdownMenuItemProps) => {
  console.log('closeDropdown:', closeDropdown);
  const handleClick = () => {
    console.log('clicked');
    if (closeDropdown) {
      console.log('Closing dropdown');
      closeDropdown(); // 메뉴 클릭 시 드롭다운 닫기
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className="w-full cursor-pointer rounded-[11px] border-none bg-b-secondary bg-none px-[16px] pb-[11px] pt-[12px] text-md transition-colors duration-200 hover:bg-b-tertiary focus:outline-none active:scale-95"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default DropdownMenuItem;
