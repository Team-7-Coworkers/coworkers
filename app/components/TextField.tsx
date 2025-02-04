'use client';

import React, { useEffect, useRef } from 'react';
import styles from '@/app/styles/scrollbar.module.css';

interface TextFieldProps {
  id?: string;
  type: 'box' | 'reply';
  height?: number;
  value: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

export default function TextField({
  id,
  type,
  height,
  value,
  placeholder,
  onChange,
  className = '',
}: TextFieldProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const baseStyle =
    'w-full text-primary resize-none break-all font-normal text-t-primary focus:outline-none';

  const typeStyle =
    type === 'box'
      ? `border border-[#F8FAFC1A] pl-[16px] sm:pl-[24px] py-[8px] sm:py-[16px] text-md sm:text-lg leading-26 focus:border-bd-primary border-1px rounded-[12px] bg-b-secondary placeholder-[#9CA3AF] ${styles.customScrollbar}`
      : 'h-full p-0 text-sm border-none bg-transparent placeholder-t-default overflow-hidden';

  // reply 타입 - 내용에 맞게 높이 설정
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px'; // 먼저 높이를 자동으로 재설정
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 실제 내용에 맞는 높이로 설정
    }
  };

  useEffect(() => {
    if (type === 'reply') {
      adjustHeight();

      // 창 크기 변경 시에도 높이 조절
      window.addEventListener('resize', adjustHeight);

      return () => {
        window.removeEventListener('resize', adjustHeight); // 리소스 정리
      };
    }
  }, [value, type]);

  return (
    <textarea
      id={id}
      ref={textareaRef}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={`${baseStyle} ${typeStyle} ${className}`}
      style={type === 'box' && height ? { height: `${height}px` } : {}}
    />
  );
}
