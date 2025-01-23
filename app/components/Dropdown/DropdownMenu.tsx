import React, { ReactNode } from 'react';
import styles from './DropdownMenu.module.css';

interface DropdownMenuProps {
  children: ReactNode;
  className?: string;
  animationType?: 'scale' | 'slide';
  isOpen: boolean;
}

const DropdownMenu = ({
  children,
  className,
  animationType,
  isOpen,
}: DropdownMenuProps) => {
  if (!isOpen) return null;

  const animationClasses = {
    scale: styles['scale-in-tr'],
    slide: styles['slide-in-top'],
  };

  const animationClass =
    (animationType && animationClasses[animationType]) || '';

  return (
    <div
      className={`border-b-tertiarytertiary absolute w-[120px] overflow-hidden rounded-[12px] border-[1px] border-[#334155] bg-b-secondary p-[2px] ${className} ${animationClass}`}
    >
      {children}
    </div>
  );
};

export default DropdownMenu;
