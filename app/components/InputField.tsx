import React, { ReactNode, useState, useEffect } from 'react';
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
  maxlength?: number;
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
  maxlength,
}: InputProps) {
  const [inputType, setInputType] = useState(type);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    setError(errorMessage);
  }, [errorMessage]);

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
            ? '/images/icons/ic_visibility-off.svg'
            : '/images/icons/ic_visibility-on.svg'
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
          onBlur={validator ? handleBlur : undefined}
          maxLength={maxlength}
          disabled={isDisabled}
          className={`w-full rounded-xl px-4 py-3 text-md sm:py-4 sm:text-lg ${
            isDisabled
              ? 'border border-bd-primary/10 bg-b-tertiary text-t-disabled'
              : 'border border-bd-primary/10 bg-b-secondary text-t-primary hover:border-i-hover focus:border-i-focus focus:outline-none focus:ring-1 focus:ring-green-500'
          } placeholder-t-default ${error ? 'border-danger' : ''}`}
        />
        <div className="absolute right-4 top-1/2 flex -translate-y-1/2 transform items-center justify-center space-x-2">
          {!isDisabled && isPassword && renderPasswordToggle()}
          {children}
        </div>
      </div>
      {error && <p className="mt-2 text-md font-medium text-danger">{error}</p>}
    </div>
  );
}

export default InputField;
