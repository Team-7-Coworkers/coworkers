import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  styleType?: 'solid' | 'outlined' | 'outlined-secondary';
  size?: 'large' | 'X-small' | string;
  state?: 'default' | 'danger' | 'floating';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const Button = ({
  children,
  styleType = 'solid',
  state = 'default',
  size = 'large',
  disabled = false,
  type = 'button',
  onClick,
}: ButtonProps) => {
  const baseStyles = () =>
    `font-semibold text-center ${state === 'floating' ? 'rounded-[40px] shadow-[0px_25px_50px_-12px_#00000040]' : 'rounded-xl'}`;

  const isDisabled = disabled ? 'cursor-not-allowed' : '';
  const sizeClass: Record<string, string> = {
    large: 'w-[332px] h-[48px] text-lg p-3',
    'X-small': 'w-[74px] h-[32px] text-sm p-[6px]',
  };
  const sizeStyles = sizeClass[size] || size;

  const getStyleByType = (type: string) => {
    if (disabled) {
      return type === 'outlined'
        ? 'bg-white border border-i-inactive text-i-inactive'
        : 'bg-i-inactive text-t-inverse';
    }

    if (state === 'danger') {
      return 'bg-danger text-t-inverse hover:bg-[#B91C1C] active:bg-[#7F1D1D]';
    }

    if (type === 'outlined-secondary') {
      return 'bg-white border border-[#CBD5E1] text-t-default hover:border-[#E2E8F0] hover:text-t-secondary active:border-[#E2E8F0] active:text-t-tertiary';
    }

    return type === 'outlined'
      ? 'bg-white border border-primary text-primary hover:border-i-hover hover:text-i-hover active:border-i-pressed active:text-i-pressed'
      : 'bg-primary text-t-inverse hover:bg-i-hover active:bg-i-pressed';
  };

  const styleTypes = {
    solid: getStyleByType('solid'),
    outlined: getStyleByType('outlined'),
    'outlined-secondary': getStyleByType('outlined-secondary'),
  };

  const styleClasses = `${baseStyles()} ${sizeStyles} ${styleTypes[styleType]} ${isDisabled}`;

  return (
    <button
      type={type}
      className={styleClasses}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
