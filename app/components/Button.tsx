'use client';

import React from 'react';

interface ButtonProps {
  text: string;
  styleType?: 'solid' | 'outlined' | 'outlined-secondary';
  size?: 'large';
  state?: 'default' | 'danger';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  styleType = 'solid',
  state = 'default',
  onClick,
}) => {
  const baseStyles = 'px-4 py-2 rounded font-medium text-center';
  const sizeStyles = 'w-[332px] h-[48px] text-lg';
  const solidStyles =
    state === 'danger'
      ? 'bg-[var(--Status-Danger,#EF4444)] text-white'
      : 'bg-[var(--Color-Brand-Primary,#10B981)] text-white';
  const outlinedStyles =
    'bg-white border-[1px] border-[var(--Color-Brand-Primary,#10B981)] text-[var(--Color-Brand-Primary,#10B981)]';
  const outlinedSecondaryStyles =
    'bg-white border-[1px] border-[var(--Text-Secondary,#CBD5E1)] text-[var(--Text-Secondary,#CBD5E1)]';

  let styleClasses = '';

  if (styleType === 'solid') {
    styleClasses = solidStyles;
  } else if (styleType === 'outlined') {
    styleClasses = outlinedStyles;
  } else if (styleType === 'outlined-secondary') {
    styleClasses = outlinedSecondaryStyles;
  }

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${styleClasses}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
