import React, { useState } from 'react';
import Modal, { ModalFooter } from '@/app/components/Modal';
import Button from '@/app/components/Button';
import InputField from '@/app/components/InputField';
import { postGroupsTaskLists } from '@/app/api/taskList.api';
import { TaskListParamsType } from '@/app/types/taskList';
import { MAX_LENGTH } from '@/app/constants/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTaskStore } from '@stores/taskStore';

type AddListModalProps = {
  isOpen: boolean;
  onClose: () => void;
  groupId: number;
  onListAdded: (newTaskListId: number) => void;
};

export default function AddListModal({
  isOpen,
  onClose,
  groupId,
  onListAdded,
}: AddListModalProps) {
  const [listName, setListName] = useState('');
  const queryClient = useQueryClient();

  const { setSelectedCategory } = useTaskStore();

  const mutation = useMutation({
    mutationFn: async (params: TaskListParamsType['postGroupsTaskLists']) =>
      postGroupsTaskLists(params),
    onSuccess: (newTaskList) => {
      const newTaskListId = newTaskList?.id;

      if (newTaskListId) {
        setSelectedCategory(newTaskListId);
        onListAdded(newTaskListId);
      }

      queryClient.invalidateQueries({ queryKey: ['groupTasks', groupId] });
      setListName('');
      onClose();
    },
    onError: (error) => {
      console.error('목록 추가 중 오류 발생:', error);
      alert('목록 추가에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleAddList = () => {
    if (listName.trim() === '') return;

    mutation.mutate({
      groupId,
      name: listName,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      title="새로운 목록 추가"
      isCloseOutsideClick
      onClose={onClose}
    >
      <p className="mt-3 text-center font-medium leading-5 text-t-default">
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
          maxlength={MAX_LENGTH.taskListName}
          onChange={(e) => setListName(e.target.value)}
          className="mt-3"
        />
        <div className="help-message">
          할 일 목록 이름은 최대 {MAX_LENGTH.taskName}자 입니다.
        </div>
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
  );
}
