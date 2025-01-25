import { useState } from 'react';

import Button from '../components/Button';
import InputField from '../components/InputField';
import Modal, { ModalFooter } from '../components/Modal';
import TaskListsItem from './TaskListsItem';

import styles from './teampage.module.css';
import { postGroupsTaskLists } from '../api/taskList.api';

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

const INPUT_MESSAGE = '목록 명을 입력해주세요.';

export default function TaskLists({ groupId, taskLists = [] }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const isEmtpy = taskLists.length === 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage(INPUT_MESSAGE);
      return;
    }
    const result = await postGroupsTaskLists({ name, groupId });
    console.log('--- 할 일 목록 생성: result:', result);
    setModalOpen(false);
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
            onClick={() => setModalOpen(true)}
          >
            + 새로운 목록 추가하기
          </button>
        </header>

        {isEmtpy ? (
          <p className="mb-6 mt-16 text-center text-md font-medium text-t-default">
            아직 할 일 목록이 없습니다.
          </p>
        ) : (
          <ul>
            {taskLists.map((taskList) => (
              <TaskListsItem
                key={taskList.id}
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
            placeholder={INPUT_MESSAGE}
            type="text"
            id="group-name"
            value={name}
            errorMessage={errorMessage}
            onChange={(e) => setName(e.target.value)}
          />
          <ModalFooter>
            <Button
              type="submit"
              disabled={errorMessage !== '' || name.trim() === ''}
            >
              만들기
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}
