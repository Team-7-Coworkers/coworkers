import Button from '../components/Button';
import Modal, { ModalFooter } from '../components/Modal';

interface ConFirmSecessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteUser: () => void;
}

export default function ConFirmSecessionModal({
  isOpen,
  onClose,
  onDeleteUser,
}: ConFirmSecessionModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      icon="danger"
      onClose={onClose}
    >
      <div className="space-y-2 text-center">
        <div className="text-white">회원 탈퇴를 진행하시겠어요?</div>
        <p>
          그룹장으로 있는 그룹은 자동으로 삭제되고,
          <br />
          모든 그룹에서 나가집니다.
        </p>
      </div>

      <ModalFooter>
        <Button
          onClick={onClose}
          styleType="outlined"
        >
          취소
        </Button>
        <Button
          state="danger"
          onClick={onDeleteUser}
        >
          회원탈퇴
        </Button>
      </ModalFooter>
    </Modal>
  );
}
