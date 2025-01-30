import Link from 'next/link';

import { cn } from '../libs/utils';

import type { TaskListProps } from './TaskLists';
import TaskProgress from './TaskProgress';

import KebabIcon from '../components/icons/KebabIcon';
import styles from './teampage.module.css';

// 목록 왼쪽 보더 색상값들
const COLORS = ['purple', 'blue', 'cyan', 'pink', 'rose', 'orange', 'yellow'];

export default function TaskListsItem({
  id,
  groupId,
  name,
  displayIndex,
  tasks,
}: TaskListProps) {
  const borderColor = 'border-' + COLORS[displayIndex % COLORS.length];
  const done = tasks.filter((task) => task.doneAt !== null);

  return (
    <li className={cn(borderColor, styles.task)}>
      <h3 className="mr-2 truncate text-md font-medium">
        <Link
          href={`${groupId}/tasklist`}
          className="hover:underline"
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

      <button className={styles.iconButton}>
        <KebabIcon />
      </button>
    </li>
  );
}
