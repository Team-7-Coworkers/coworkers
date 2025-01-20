import React, { useState } from 'react';
import Image from 'next/image';

interface InputProps {
  type: 'text' | 'password' | 'email';
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validator?: (value: string) => string | undefined;
  errorMessage?: string;
  isPassword?: boolean;
  className?: string;
}

function InputField({
  type,
  placeholder,
  value,
  onChange,
  validator,
  errorMessage,
  isPassword = false,
  className = '',
}: InputProps) {
  const [inputType, setInputType] = useState(type);
  const [error, setError] = useState<string | undefined>();

  const handleBlur = () => {
    if (validator) {
      const validationError = validator(value || '');
      setError(validationError);
    }
  };

  const togglePasswordVisibility = () => {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-3 sm:py-4 text-md sm:text-lg rounded-xl bg-b-secondary border border-bd-primary/10
            text-t-primary placeholder-t-default
            focus:outline-none
            hover:border-i-hover focus:ring-1 focus:ring-green-500
            focus:border-i-focus 
            ${error || errorMessage ? 'border-danger' : ''}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-t-default hover:text-i-hover"
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
        )}
      </div>
      {(error || errorMessage) && (
        <p className="text-danger text-md font-medium mt-2">
          {error || errorMessage}
        </p>
      )}
    </div>
  );
}

export default InputField;
