import { ReactNode } from 'react';

import AlertIcon from './AlertIcon';
import CloseIcon from './CloseIcon';
import styles from './Modal.module.css';

interface ModalProps {
  /** 모달 출력 여부 */
  isOpen: boolean;
  /** 우상단 닫기 버튼 출력 여부 */
  hasCloseButton?: boolean;
  /** 모달 바깥 클릭으로 모달 닫기 여부 */
  isCloseOutsideClick?: boolean;
  /** 경고 알림 모달을 위한 아이콘(현재는 'danger' 하나 있음) */
  icon?: 'danger' | null;
  /** 모달 제목 문자열 */
  title?: string;
  /** 모달 내부 children 요소 */
  children: ReactNode;
  /** 모달 닫기 함수 */
  onClose: () => void;
}

const ModalFooter = ({ children }: { children: ReactNode }) => {
  return <div className={styles.footer}>{children}</div>;
};

/** 공통 모달 컴포넌트 */
export default function Modal({
  isOpen = false,
  hasCloseButton = true,
  isCloseOutsideClick = false,
  icon = null,
  title,
  children,
  onClose,
}: ModalProps) {
  // 닫기 버튼 콜백 함수
  const handleClick = () => {
    onClose();
  };

  // 모달 바깥 클릭 콜백 함수
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (isCloseOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <dialog
      className={styles.modal}
      open={isOpen}
      onClick={handleBackdropClick}
    >
      <div className={styles.container}>
        {icon === 'danger' && (
          <AlertIcon classname="mx-auto mb-4 text-danger" />
        )}

        {title && <h5 className={styles.title}>{title}</h5>}

        {children}

        {hasCloseButton && (
          <button
            type="button"
            aria-label="닫기"
            className={styles.btnClose}
            onClick={handleClick}
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </dialog>
  );
}

export { ModalFooter };
