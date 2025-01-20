'use client';

import React, { useEffect, useRef } from 'react';
import styles from '@/app/styles/scrollbar.module.css';

interface TextFieldProps {
  type: 'box' | 'reply';
  height?: number;
  value: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextField({
  type,
  height,
  value,
  placeholder,
  onChange,
}: TextFieldProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const baseStyle =
    'w-full text-primary resize-none font-normal text-t-primary focus:outline-none';

  const typeStyle =
    type === 'box'
      ? `border border-[#F8FAFC1A] px-[16px]  sm:px-[24px] py-[8px] sm:py-[16px] text-md sm:text-lg leading-26 focus:border-bd-primary border-1px rounded-[12px] bg-b-secondary placeholder-[#9CA3AF] overflow-auto ${styles.customScrollbar}`
      : 'h-full p-0 text-sm border-none bg-transparent placeholder-t-default';

  // reply 타입 - 내용에 맞게 높이 설정
  useEffect(() => {
    if (textareaRef.current && type === 'reply') {
      textareaRef.current.style.height = '0px';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, type]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={`${baseStyle} ${typeStyle}`}
      style={type === 'box' && height ? { height: `${height}px` } : {}}
    />
  );
}
