import axios from 'axios';
import { toast } from 'react-toastify';

interface ErrorHandlerOptions {
  prefixMessage?: string;
  onDisplay?: (message: string) => void;
}

export function createErrorHandler(options?: ErrorHandlerOptions) {
  const {
    prefixMessage = '에러',
    onDisplay = (message: string) => toast.error(message),
  } = options || {};

  return (error: unknown) => {
    let message: string = '오류가 발생했습니다. 잠시 후 다시 시도해주세요.';

    if (axios.isAxiosError(error) && error.response?.data?.message) {
      message = error.response?.data?.message;
    }

    onDisplay(`${prefixMessage}: ${message}`);
  };
}
