import { useState } from 'react';

import Modal, { type ModalProps, ModalFooter } from './index';
import Button from '@components/Button';

export interface AlertModalProps extends ModalProps {
  buttonText: string;
  onOkClick: () => void;
}

interface AlertModalConfig {
  title?: string;
  buttonText?: string;
  onOkClick?: () => void;
}

const initProps = {
  isOpen: false,
  title: '알림',
  buttonText: '확인',
  children: 'message',
  onClose: () => {},
  onOkClick: () => {},
};

const AlertModal = ({
  isOpen,
  title,
  buttonText,
  onOkClick,
  children,
}: AlertModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      hasCloseButton={false}
      onClose={() => null}
    >
      <p className="text-center">{children}</p>
      <ModalFooter>
        <Button onClick={() => onOkClick()}>{buttonText}</Button>
      </ModalFooter>
    </Modal>
  );
};

const useAlertModal = () => {
  const [config, setConfig] = useState<AlertModalProps>(initProps);

  const onClose = () => {
    setConfig({ ...config, isOpen: false });
  };

  const alertModalOpen = (
    message: string,
    {
      title = config.title,
      buttonText = config.buttonText,
      onOkClick,
    }: AlertModalConfig = {}
  ) => {
    setConfig({
      isOpen: true,
      title,
      buttonText,
      children: message,
      onClose,
      onOkClick: () => {
        if (onOkClick) onOkClick();
        onClose();
      },
    });
  };

  const AlertModalContainer = () => {
    return <AlertModal {...config} />;
  };

  return { AlertModalContainer, config, alertModalOpen };
};

export default AlertModal;
export { useAlertModal };
