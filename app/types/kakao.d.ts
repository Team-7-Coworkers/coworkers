declare global {
  interface Window {
    Kakao: KakaoSDK;
  }
}

// 카카오 SDK 인터페이스 정의
interface KakaoSDK {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Auth: {
    authorize: (options: {
      redirectUri: string;
      state?: string;
      isPopup?: boolean;
      prompt?: 'login' | 'none';
    }) => void;

    logout(callback: () => void): void;
  };
}

// 로그인 성공 응답 타입
interface KakaoAuthResponse {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  refresh_token_expires_in?: number;
  scope?: string;
  token_type?: string;
}

// 카카오 로그인 실패(에러) 응답 타입
interface KakaoAuthError {
  error: string;
  error_description: string;
}

interface KakaoAuth {
  setAccessToken(token: string | null): void;
  // 필요에 따라 다른 메서드도 추가
}

declare const Kakao: KakaoStatic;

export {};
