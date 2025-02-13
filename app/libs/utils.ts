import { toast } from 'react-toastify';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { TOAST_CLOSE_TIME } from '@constants/times';

// clsx와 tailwind를 같이 쓸때는 가능한 아래 함수를 사용해 주세요.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 클립보드에 문자열 복사하기 함수
export const copyToClipboard = async (
  copyText: string,
  successMessage: string = '복사에 성공하였습니다.',
  failMessage: string = '복사에 실패하였습니다.'
) => {
  try {
    await navigator.clipboard.writeText(copyText);
    toast.success(successMessage, {
      autoClose: TOAST_CLOSE_TIME.success,
    });
  } catch (err) {
    toast.error(failMessage);
    console.error(failMessage, err);
  }
};
