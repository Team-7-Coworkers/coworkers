import React, { ReactNode, ReactElement } from 'react';
import styles from './DropdownMenu.module.css';
import DropdownMenuItem, { DropdownMenuItemProps } from './DropdownMenuItem';

export interface DropdownMenuProps {
  children: ReactNode;
  className?: string;
  animationType?: 'scale' | 'slide';
  isOpen?: boolean;
  closeDropdown?: () => void;
}

const DropdownMenu = ({
  children,
  className,
  animationType,
  isOpen = false,
  closeDropdown,
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
      className={`border-b-tertiarytertiary absolute z-40 w-[120px] overflow-hidden rounded-[12px] border-[1px] border-[#334155] bg-b-secondary p-[2px] ${className} ${animationClass}`}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DropdownMenuItem) {
          // DropdownMenuItem에 closeDropdown 전달
          return React.cloneElement(
            child as ReactElement<DropdownMenuItemProps>,
            {
              closeDropdown,
            }
          );
        }
        return child;
      })}
    </div>
  );
};

export default DropdownMenu;
