import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  deleteGroupsTaskLists,
  patchGroupsTaskLists,
  postGroupsTaskLists,
} from '../api/taskList.api';
import { MAX_LENGTH } from '../constants/form';

import Button from '../components/Button';
import InputField from '../components/InputField';
import Modal, { ModalFooter } from '../components/Modal';
import TaskListsItem from './TaskListsItem';

import styles from './teampage.module.css';
import { toast } from 'react-toastify';
import { TOAST_CLOSE_TIME } from '@constants/times';

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
};

interface Props {
  groupId: number;
  taskLists: TaskListProps[];
}

// 모달(폼) 형태
type ModalMode = 'post' | 'patch';

export default function TaskLists({ groupId, taskLists = [] }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('post');
  const [taskListId, setTaskListId] = useState(0);
  const [name, setName] = useState('');

  const queryClient = useQueryClient();
  const { mutate: postMutate, isPending: isPostPending } = useMutation({
    mutationFn: async () => await postGroupsTaskLists({ name, groupId }),
    onSuccess: () => {
      // console.log('--- data', data);
      queryClient.invalidateQueries({ queryKey: ['getGroupsById'] });
      toast.success('할 일 목록 생성에 성공하였습니다.', {
        autoClose: TOAST_CLOSE_TIME.success,
      });
      setModalOpen(false);
    },
    onError: (err) => {
      console.error('--- error', err);
      toast.error(
        '할 일 목록 생성에 실패 하였습니다. 잠시 후 다시 시도해 주세요.'
      );
    },
  });
  const { mutate: patchMutate, isPending: isPatchPending } = useMutation({
    mutationFn: async () =>
      await patchGroupsTaskLists({ groupId, taskListId, name }),
    onSuccess: () => {
      // console.log('--- data', data);
      toast.success('할 일 목록 수정에 성공하였습니다.', {
        autoClose: TOAST_CLOSE_TIME.success,
      });
      queryClient.invalidateQueries({ queryKey: ['getGroupsById'] });
      setModalOpen(false);
    },
    onError: (err) => {
      console.error('--- error', err);
      toast.error(
        '할 일 목록 수정에 실패 하였습니다. 잠시 후 다시 시도해 주세요.'
      );
    },
  });
  const { mutate: deleteMutate, isPending: isDeletePending } = useMutation({
    mutationFn: async () =>
      await deleteGroupsTaskLists({ groupId, taskListId }),
    onSuccess: () => {
      // console.log('--- data', data);
      toast.success('할 일 목록을 삭제하였습니다.', {
        autoClose: TOAST_CLOSE_TIME.success,
      });
      queryClient.invalidateQueries({ queryKey: ['getGroupsById'] });
      setDeleteModalOpen(false);
    },
    onError: (err) => {
      console.error('--- error', err);
      toast.error(
        '할 일 목록 삭제에 실패 하였습니다. 잠시 후 다시 시도해 주세요.'
      );
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

  const handleDeleteList = (id: number) => {
    setTaskListId(id);
    setDeleteModalOpen(true);
  };

  // 할 일 목록 폼 서브밋 함수
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate[modalMode]();
  };

  // 할 일 목록 삭제 모달 닫기 함수
  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  const handleTaskListDelete = () => {
    // console.log('deleteMutate');
    deleteMutate();
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
            {taskLists.map((taskList, index) => (
              <TaskListsItem
                key={taskList.id}
                index={index}
                onEdit={handleEditList}
                onDelete={handleDeleteList}
                {...taskList}
              />
            ))}
          </ul>
        )}
      </section>

      <Modal
        title={
          modalMode === 'post' ? '할 일 목록 만들기' : '할 일 목록 수정하기'
        }
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

      <Modal
        title="할 일 목록 삭제하기"
        icon="danger"
        isOpen={deleteModalOpen}
        onClose={handleDeleteModalClose}
      >
        <p className="text-center">
          선택한 할 일 목록을 정말로 삭제하시겠습니까?
          <br />
          삭제하시면 다시 되돌릴 수 없습니다.
        </p>
        <ModalFooter>
          <Button
            styleType="outlined"
            onClick={handleDeleteModalClose}
          >
            취소
          </Button>
          <Button
            state="danger"
            onClick={handleTaskListDelete}
            disabled={isDeletePending}
          >
            삭제
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
