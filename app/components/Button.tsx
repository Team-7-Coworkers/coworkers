'use client';

import React from 'react';

interface ButtonProps {
  text: string;
  styleType?: 'solid' | 'outlined' | 'outlined-secondary';
  size?: 'large' | 'X-small' | string;
  state?: 'default' | 'danger';
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  styleType = 'solid',
  state = 'default',
  size = 'large',
  disabled = false,
  onClick,
}) => {
  const baseStyles = 'rounded-xl font-medium text-center';
  const isDisabled = disabled ? 'cursor-not-allowed' : '';
  const sizeStyles =
    size === 'large'
      ? 'w-[332px] h-[48px] text-lg p-3'
      : size === 'X-small'
        ? 'w-[74px] h-[32px] text-sm p-[6px]'
        : size; // 사용자가 직접 크기와 패딩 등을 변경할 수 있게 추가했습니다

  const getStyleByType = (type: string) => {
    if (disabled) {
      return type === 'outlined'
        ? 'bg-white border-[1px] border-[var(--Interaction-Inactive,#94A3B8)] text-[var(--Interaction-Inactive,#94A3B8)]'
        : 'bg-[var(--Interaction-Inactive,#94A3B8)] text-white';
    }

    if (state === 'danger') {
      return type === 'outlined'
        ? 'bg-white border-[1px] border-[var(--Status-Danger,#EF4444)] text-[var(--Status-Danger,#EF4444)] hover:border-[var(--Status-Danger-Hover,#DC2626)] hover:text-[var(--Status-Danger-Hover,#DC2626)] active:border-[var(--Status-Danger-Pressed,#B91C1C)] active:text-[var(--Status-Danger-Pressed,#B91C1C)]'
        : 'bg-[var(--Status-Danger,#EF4444)] text-white hover:bg-[var(--Status-Danger-Hover,#DC2626)] active:bg-[var(--Status-Danger-Pressed,#B91C1C)]';
    }

    return type === 'outlined'
      ? 'bg-white border-[1px] border-[var(--Color-Brand-Primary,#10B981)] text-[var(--Color-Brand-Primary,#10B981)] hover:border-[var(--Interaction-Hover,#059669)] hover:text-[var(--Interaction-Hover,#059669)] active:border-[var(--Interaction-Pressed,#047857)] active:text-[var(--Interaction-Pressed,#047857)]'
      : 'bg-[var(--Color-Brand-Primary,#10B981)] text-white hover:bg-[var(--Interaction-Hover,#059669)] active:bg-[var(--Interaction-Pressed,#047857)]';
  };

  const styleTypes = {
    solid: getStyleByType('solid'),
    outlined: getStyleByType('outlined'),
    'outlined-secondary': `
      bg-white border-[1px] border-[var(--Text-Secondary,#CBD5E1)] text-[var(--Text-Secondary,#CBD5E1)]
      hover:border-[var(--Text-Secondary-Hover,#94A3B8)] hover:text-[var(--Text-Secondary-Hover,#94A3B8)] active:border-[var(--Text-Secondary-Hover,#94A3B8)] active:text-[var(--Text-Secondary-Hover,#94A3B8)]
    `,
  };

  const styleClasses = `${baseStyles} ${sizeStyles} ${styleTypes[styleType]} ${isDisabled}`;

  return (
    <button
      className={styleClasses}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
