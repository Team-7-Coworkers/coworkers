import axios from 'axios';
import { toast } from 'react-toastify';

interface ErrorHandlerOptions {
  prefixMessage?: string; // 에러 상황 설명 (ex: 로그인 실패, 회원가입 실패)
  defaultErrorMessage?: string; // 서버 응답에 에러메시지가 없는 경우 사용할 메시지
  onDisplay?: (message: string) => void; // 에러 출력 방법 (ex: console.error, alert)
  onAfter?: (error: unknown) => void; // 에러 출력 후 동작
}

export function createErrorHandler(options?: ErrorHandlerOptions) {
  const {
    prefixMessage = '에러',
    onDisplay = (message: string) => toast.error(message), // 에러 출력 기본값은 toast.error
    defaultErrorMessage = '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    onAfter,
  } = options || {};

  return (error: unknown) => {
    let message: string = defaultErrorMessage;

    if (axios.isAxiosError(error) && error.response?.data?.message) {
      message = error.response?.data?.message;
    }

    onDisplay(`${prefixMessage}: ${message}`);

    if (onAfter) {
      onAfter(error);
    }
  };
}
