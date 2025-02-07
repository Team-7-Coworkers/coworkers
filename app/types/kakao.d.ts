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

export {};
