import React, { ReactNode, useState } from 'react';
import Image from 'next/image';

interface InputProps {
  id: string;
  type: 'text' | 'password' | 'email';
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validator?: (value: string) => string | undefined;
  errorMessage?: string;
  isPassword?: boolean;
  className?: string;
  state?: 'default' | 'default-disabled';
  children?: ReactNode;
}

function InputField({
  id,
  type,
  placeholder,
  value,
  onChange,
  validator,
  errorMessage,
  isPassword = false,
  className = '',
  state = 'default',
  children,
}: InputProps) {
  const [inputType, setInputType] = useState(type);
  const [error, setError] = useState<string | undefined>(errorMessage);

  const handleBlur = () => {
    if (validator) {
      const validationError = validator(value || '');
      setError(validationError);
    }
  };

  const togglePasswordVisibility = () => {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  const isDisabled = state === 'default-disabled';

  const renderPasswordToggle = () => (
    <button
      type="button"
      onClick={togglePasswordVisibility}
      className="text-t-default hover:text-i-hover"
      aria-label={inputType === 'password' ? 'Show password' : 'Hide password'}
    >
      <Image
        src={
          inputType === 'password'
            ? '/images/icons/icon-visibility-off.svg'
            : '/images/icons/icon-visibility-on.svg'
        }
        alt={inputType === 'password' ? 'Show' : 'Hide'}
        width={24}
        height={24}
      />
    </button>
  );

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          disabled={isDisabled}
          className={`w-full px-4 py-3 sm:py-4 text-md sm:text-lg rounded-xl
            ${
              isDisabled
                ? 'border border-bd-primary/10 bg-b-tertiary text-t-disabled'
                : 'bg-b-secondary border border-bd-primary/10 text-t-primary focus:outline-none hover:border-i-hover focus:ring-1 focus:ring-green-500 focus:border-i-focus'
            }
            placeholder-t-default ${error || errorMessage ? 'border-danger' : ''}`}
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center space-x-2">
          {!isDisabled && isPassword && renderPasswordToggle()}
          {children}
        </div>
      </div>
      {error && <p className="text-danger text-md font-medium mt-2">{error}</p>}
    </div>
  );
}

export default InputField;
