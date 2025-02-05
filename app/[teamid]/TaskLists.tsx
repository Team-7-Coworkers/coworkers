import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchGroupsTaskLists, postGroupsTaskLists } from '../api/taskList.api';
import { MAX_LENGTH } from '../constants/form';

import Button from '../components/Button';
import InputField from '../components/InputField';
import Modal, { ModalFooter } from '../components/Modal';
import TaskListsItem from './TaskListsItem';

import styles from './teampage.module.css';

// 할 일 속성
export type TaskProps = {
  id: number;
  name: string;
  description: string;
  doneAt: string | null;
};

// 할 일 목록 속성
export type TaskListProps = {
  id: number;
  groupId: number;
  name: string;
  displayIndex: number;
  tasks: TaskProps[];
  onEdit?: (id: number) => void;
};

interface Props {
  groupId: number;
  taskLists: TaskListProps[];
}

// 모달(폼) 형태
type ModalMode = 'post' | 'patch';

export default function TaskLists({ groupId, taskLists = [] }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('post');
  const [taskListId, setTaskListId] = useState(0);
  const [name, setName] = useState('');

  const queryClient = useQueryClient();
  const { mutate: postMutate, isPending: isPostPending } = useMutation({
    mutationFn: async () => await postGroupsTaskLists({ name, groupId }),
    onSuccess: () => {
      // console.log('--- data', data);
      queryClient.invalidateQueries({ queryKey: ['getGroupsById'] });
      setModalOpen(false);
    },
    onError: (err) => {
      console.error('--- error', err);
      alert('할 일 목록 생성에 실패 하였습니다. 잠시 후 다시 시도해 주세요.');
    },
  });
  const { mutate: patchMutate, isPending: isPatchPending } = useMutation({
    mutationFn: async () =>
      await patchGroupsTaskLists({ groupId, taskListId, name }),
    onSuccess: (data) => {
      console.log('--- data', data);
      queryClient.invalidateQueries({ queryKey: ['getGroupsById'] });
      setModalOpen(false);
    },
    onError: (err) => {
      console.error('--- error', err);
      alert('할 일 목록 수정에 실패 하였습니다. 잠시 후 다시 시도해 주세요.');
    },
  });
  const mutate = {
    post: postMutate,
    patch: patchMutate,
  };

  // 할 일 목록 생성
  const handleNewList = () => {
    setName('');
    setModalMode('post');
    setModalOpen(true);
  };

  // 할 일 목록 수정
  const handleEditList = (id: number) => {
    const tasklist = taskLists.find((tasklist) => tasklist.id === id);

    if (!tasklist) return;

    setTaskListId(id);
    setName(tasklist.name);
    setModalMode('patch');
    setModalOpen(true);
  };

  // 할 일 목록 폼 서브밋 함수
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate[modalMode]();
  };

  return (
    <>
      <section className={styles.section}>
        <header className={styles.sectionheader}>
          <h2 className={styles.title}>할 일 목록</h2>
          <span className="ml-2 text-lg text-t-default">
            ({taskLists.length}개)
          </span>

          <button
            className="text-button ml-auto text-md"
            onClick={handleNewList}
          >
            + 새로운 목록 추가하기
          </button>
        </header>

        {taskLists.length === 0 ? (
          <p className="mb-6 mt-16 text-center text-md font-medium text-t-default">
            아직 할 일 목록이 없습니다.
          </p>
        ) : (
          <ul>
            {taskLists.map((taskList) => (
              <TaskListsItem
                key={taskList.id}
                onEdit={handleEditList}
                {...taskList}
              />
            ))}
          </ul>
        )}
      </section>

      <Modal
        title="할 일 목록"
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <form
          onSubmit={handleSubmit}
          className="mt-4"
        >
          <InputField
            id="group-name"
            type="text"
            placeholder="목록 명을 입력해주세요."
            maxlength={MAX_LENGTH.taskListName}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="help-message">
            할 일 목록 이름은 최대 {MAX_LENGTH.taskListName}자 입니다.
          </div>

          <ModalFooter>
            <Button
              type="submit"
              disabled={name.trim() === '' || isPostPending || isPatchPending}
            >
              {modalMode === 'post' ? '만들기' : '수정하기'}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}
