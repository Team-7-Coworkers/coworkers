'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function EasyLogin({ page }: { page: 'login' | 'signup' }) {
  const handleKakaoLogin = () => {
    if (!window.Kakao) {
      alert('카카오 SDK가 로드되지 않았습니다.');
      return;
    }
    if (!window.Kakao.Auth) {
      alert('카카오 Auth 모듈이 로드되지 않았습니다.');
      return;
    }

    // CSRF 방지를 위한 랜덤 값
    // 인가 코드와 함께 돌려받았을 때 일치 여부를 검증
    const state = Math.random().toString(36).substring(2, 10);

    window.Kakao.Auth.authorize({
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI!, // 인가 코드 받을 페이지
      state: state,
    });

    localStorage.setItem('kakao_state', state); // 이후 검증을 위해 저장
  };

  // 구글 로그인 창으로 이동
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
