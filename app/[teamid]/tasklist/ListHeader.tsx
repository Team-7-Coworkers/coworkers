import { useState } from 'react';
import ListDate from './ListDate';
import Button from '@/app/components/Button';
import Modal, { ModalFooter } from '@/app/components/Modal';
import InputField from '@/app/components/InputField';
import instance from '@/app/libs/axios';

type ListHeaderProps = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  groupId: number;
  onListAdded: () => void;
};

export default function ListHeader({
  selectedDate,
  setSelectedDate,
  groupId,
  onListAdded,
}: ListHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listName, setListName] = useState('');

  const handleModalClose = () => {
    setIsModalOpen(false);
    setListName('');
  };

  const handleAddList = async () => {
    if (listName.trim() === '') {
      alert('목록 이름을 입력해주세요.');
      return;
    }

    try {
      await instance.post(`/groups/${groupId}/task-lists`, {
        name: listName,
      });
      handleModalClose();
      onListAdded();
    } catch (error) {
      console.error('목록 추가 중 오류가 발생했습니다:', error);
      alert('목록 추가에 실패했습니다. 다시 시도해주세요.');
    }
  };
  return (
    <div className="flex items-center justify-between">
      <ListDate
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <p
        className="ml-3 cursor-pointer truncate text-md text-primary hover:text-i-hover sm:ml-5"
        onClick={() => setIsModalOpen(true)}
      >
        + 새로운 목록 추가하기
      </p>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          title="새로운 목록 추가"
          isCloseOutsideClick
          onClose={handleModalClose}
        >
          <p className="mt-3 text-center font-medium leading-5">
            할 일에 대한 목록을 추가하고
            <br />
            목록별 할 일을 만들 수 있습니다.
          </p>
          <section className="mt-5">
            <label
              htmlFor="list-name"
              className="text-lg font-medium text-t-primary"
            >
              목록 이름
            </label>
            <InputField
              id="list-name"
              type="text"
              placeholder="목록 이름을 입력해주세요."
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="mt-3"
            />
          </section>
          <ModalFooter>
            <Button
              styleType="solid"
              state="default"
              onClick={handleAddList}
              disabled={listName.trim() === ''}
            >
              만들기
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}
