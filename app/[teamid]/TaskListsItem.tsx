import Link from 'next/link';

import { cn } from '../libs/utils';

import type { TaskListProps } from './TaskLists';
import TaskProgress from './TaskProgress';

import PencelIcon from '../components/icons/PencilIcon';
import styles from './teampage.module.css';
import { useTaskStore } from '../stores/taskStore';

// 목록 왼쪽 보더 색상값들
const COLORS = ['purple', 'blue', 'cyan', 'pink', 'rose', 'orange', 'yellow'];

export default function TaskListsItem({
  id,
  groupId,
  name,
  displayIndex,
  tasks,
  onEdit,
}: TaskListProps) {
  const borderColor = 'border-' + COLORS[displayIndex % COLORS.length];
  const done = tasks.filter((task) => task.doneAt !== null);

  const { setSelectedCategory } = useTaskStore(); // task 스토어 불러오기

  // 수정 클릭 함수
  const handleClick = () => {
    if (onEdit) onEdit(id);
  };

  return (
    <li className={cn(borderColor, styles.task)}>
      <h3 className="mr-2 truncate text-md font-medium">
        <Link
          href={`${groupId}/tasklist`}
          className="hover:underline"
          onClick={() => setSelectedCategory(id)} // task 스토어에 선택한 id 값을 전달
        >
          {name}({id})
        </Link>
      </h3>

      <span className="ml-auto">
        <TaskProgress
          done={done.length}
          total={tasks.length}
        />
      </span>

      <button
        className={cn(styles.iconButton, 'tool-tip')}
        onClick={handleClick}
        aria-label="할 일 목록 수정"
      >
        <PencelIcon classname="size-3 mx-auto" />
      </button>
    </li>
  );
}
