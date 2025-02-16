'use client';

import { useState } from 'react';
import Modal, { ModalFooter } from '../../components/Modal';
import { useAlertModal } from '@components/Modal/AlertModal';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [dangerModalOpen, setDangerModalOpen] = useState(false);
  const [bigModalOpen, setBigModalOpen] = useState(false);

  const { AlertModalContainer, alertModalOpen } = useAlertModal();

  const handleClick = () => {
    alertModalOpen('테스트 알림 모달 입니다.', {
      title: '알림',
      onOkClick: () => console.log('확인을 눌렀어요.'),
    });
  };

  return (
    <>
      <h1 className="mb-4 mt-2 text-2xl font-bold">모달 테스트 페이지</h1>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="rounded-xl bg-primary px-4 py-[14px] text-lg font-semibold text-t-inverse"
        >
          모달 열기
        </button>

        <button
          type="button"
          onClick={() => setDangerModalOpen(true)}
          className="rounded-xl bg-danger px-4 py-[14px] text-lg font-semibold text-t-inverse"
        >
          경고 모달 열기
        </button>

        <button
          type="button"
          className="rounded-xl bg-primary px-4 py-[14px] text-lg font-semibold text-t-inverse"
          onClick={() => setBigModalOpen(true)}
        >
          큰 모달 열기
        </button>

        <button
          type="button"
          className="rounded-xl bg-primary px-4 py-[14px] text-lg font-semibold text-t-inverse"
          onClick={handleClick}
        >
          alert modal open
        </button>
      </div>

      <Modal
        isOpen={modalOpen}
        title="멤버 초대"
        onClose={() => setModalOpen(false)}
        isCloseOutsideClick
      >
        <p className="text-center">그룹에 참여할 수 있는 링크를 복사합니다.</p>

        <ModalFooter>
          <button className="rounded-xl bg-primary px-4 py-[14px] text-lg font-semibold text-t-inverse">
            링크 복사하기
          </button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={dangerModalOpen}
        hasCloseButton={false}
        title="회원 탈퇴를 진행하시겠어요?"
        onClose={() => setDangerModalOpen(false)}
        icon="danger"
      >
        <p className="text-pretty break-keep text-center">
          그룹장으로 있는 그룹은 자동으로 삭제되고, 모든 그룹에서 나가집니다.
        </p>

        <ModalFooter>
          <button
            className="rounded-xl bg-b-inverse px-4 py-[14px] text-lg font-semibold text-t-default"
            onClick={() => setDangerModalOpen(false)}
          >
            닫기
          </button>

          <button className="flex-1 rounded-xl bg-danger px-4 py-[14px] text-lg font-semibold text-t-inverse">
            회원 탈퇴
          </button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={bigModalOpen}
        title="Big Modal"
        position="top"
        onClose={() => setBigModalOpen(false)}
        isCloseOutsideClick
      >
        <p className="h-[900px] text-center">높이값 900 고정</p>

        <ModalFooter>
          <button
            className="rounded-xl bg-primary px-4 py-[14px] text-lg font-semibold text-t-inverse"
            onClick={() => setBigModalOpen(false)}
          >
            닫기 버튼
          </button>
        </ModalFooter>
      </Modal>

      <AlertModalContainer />
    </>
  );
}
