'use client';

import Image from 'next/image';

import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';

export default function EasyLogin({ page }: { page: 'login' | 'signup' }) {
  const handleKakaoLogin = () => {
    if (!window.Kakao) {
      toast.error(
        '카카오 로그인을 사용할 수 없습니다. 사이트 재접속 후 다시 시도해주세요.'
      );

      return;
    }
    if (!window.Kakao.Auth) {
      toast.error(
        '카카오 로그인 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'
      );

      return;
    }

    const state = Math.random().toString(36).substring(2, 10);

    window.Kakao.Auth.authorize({
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI!,
      state: state,
    });

    localStorage.setItem('kakao_state', state);
  };

  const handleGoogleLogin = () => {
    signIn('google', {
      callbackUrl: '/oauth/google',
    });
  };

  return (
    <div className="flex justify-between">
      <p className="font-medium">
        간편 {page === 'login' ? `로그인` : '회원가입'}하기
      </p>
      <div className="flex gap-4">
        <button onClick={handleGoogleLogin}>
          <Image
            src="/images/icons/ic_google.svg"
            alt="구글 간편 로그인"
            width={42}
            height={42}
          />
        </button>
        <button onClick={handleKakaoLogin}>
          <Image
            src="/images/icons/ic_kakaotalk.svg"
            alt="카카오톡 간편 로그인"
            width={42}
            height={42}
          />
        </button>
      </div>
    </div>
  );
}
