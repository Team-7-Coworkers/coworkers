'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function KakaoScript() {
  const handleKakaoInit = () => {
    if (typeof window !== 'undefined' && window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY!);
        console.log('✅ Kakao SDK 초기화 완료');
      } else {
        console.log('✅ Kakao SDK 이미 초기화됨');
      }
      console.log('✅ Kakao 객체:', window.Kakao); // Kakao 객체 확인
    }
  };

  useEffect(() => {
    setTimeout(() => {
      handleKakaoInit();
    }, 500); // 3초 후 실행 (비동기 로드 문제 해결)
  }, []);

  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
      integrity="sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka"
      crossOrigin="anonymous"
      strategy="beforeInteractive"
      onLoad={handleKakaoInit}
    />
  );
}
