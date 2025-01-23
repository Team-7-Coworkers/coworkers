import React, { ReactNode } from 'react';

interface DropdownButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}

const DropdownButton = ({
  children,
  onClick,
  className,
}: DropdownButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
};

export default DropdownButton;
