import Link from 'next/link';

import { cn } from '../libs/utils';

import type { TaskListProps } from './TaskLists';
import TaskProgress from './TaskProgress';

import KebabIcon from '../components/icons/KebabIcon';
import styles from './teampage.module.css';
import Dropdown from '../components/Dropdown';
import { useTaskStore } from '../stores/taskStore';

interface Props extends TaskListProps {
  index: number;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

// 목록 왼쪽 보더 색상값들
const COLORS = ['purple', 'blue', 'cyan', 'pink', 'rose', 'orange', 'yellow'];

export default function TaskListsItem({
  id,
  index,
  groupId,
  name,
  tasks,
  onEdit,
  onDelete,
}: Props) {
  const borderColor = 'border-' + COLORS[index % COLORS.length];
  const done = tasks.filter((task) => task.doneAt !== null);

  const { setSelectedCategory } = useTaskStore(); // task 스토어 불러오기

  // 수정 클릭 함수
  const handleEditClick = () => {
    if (onEdit) onEdit(id);
  };

  const handleDeleteClick = () => {
    if (onDelete) onDelete(id);
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

      <Dropdown>
        <Dropdown.Button className={styles.iconButton}>
          <KebabIcon classname="size-3 mx-auto" />
        </Dropdown.Button>
        <Dropdown.Menu className="right-0">
          <Dropdown.MenuItem onClick={handleEditClick}>수정</Dropdown.MenuItem>
          <Dropdown.MenuItem onClick={handleDeleteClick}>
            삭제
          </Dropdown.MenuItem>
        </Dropdown.Menu>
      </Dropdown>

      {/* <button
        className={cn(styles.iconButton, 'tool-tip')}
        onClick={handleClick}
        aria-label="할 일 목록 수정"
      >
        
      </button> */}
    </li>
  );
}
