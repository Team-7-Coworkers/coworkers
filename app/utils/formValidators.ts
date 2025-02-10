import { UserFormDataTypes } from '../mypage/page';
import { UserType } from '../types/shared';

export const validateName = (value: string) => {
  if (!value.trim()) return '닉네임은 필수 입력입니다.';
  if (value.length < 2) return '이름은 최소 2자 이상이어야 합니다.';
  if (20 <= value.length) return '닉네임은 최대 20자까지 가능합니다.';
  return undefined;
};

export const validateEmail = (value: string) => {
  if (!value.trim()) return '이메일은 필수 입력입니다.';
  if (!value.includes('@')) return '이메일 형식으로 작성해주세요';
  return undefined;
};

export const validatePassword = (value: string) => {
  if (!value.trim()) return '비밀번호는 필수 입력입니다.';
  if (value.length < 8) return '비밀번호는 최소 8자 이상이어야 합니다.';

  // 숫자, 영문, 특수문자가 모두 포함
  const hasNumber = /[0-9]/.test(value);
  const hasLetter = /[A-Za-z]/.test(value);
  const hasSpecialChar = /[!@#$%^&*]/.test(value);

  if (!hasNumber || !hasLetter || !hasSpecialChar) {
    return '비밀번호는 숫자, 영문, 특수문자를 모두 포함해야 합니다.';
  }

  return undefined;
};

export const validateConfirmPassword = (value: string) => {
  if (!value.trim()) return '비밀번호 확인을 입력해주세요.';

  // id="password"인 입력 필드의 값을 가져옴
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  const password = passwordInput?.value || '';

  if (value !== password) return '비밀번호가 일치하지 않습니다.';

  return undefined;
};

// 계정 정보 변경 여부를 확인
export const validateUserUpdated = (
  prevData: UserType,
  newData: UserFormDataTypes
): boolean => {
  const isNicknameChanged =
    prevData.nickname.trim() !== newData.nickname.trim();
  const isImageChanged = prevData.image !== newData.image;

  return isNicknameChanged || isImageChanged;
};
