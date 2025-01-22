import React, { ReactNode } from 'react';

interface DropdownButtonProps {
  children: ReactNode;
  onClick: () => void;
}

const DropdownButton = ({ children, onClick }: DropdownButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default DropdownButton;
