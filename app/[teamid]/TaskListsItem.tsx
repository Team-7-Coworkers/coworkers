import { cn } from '../libs/utils';

import type { TaskListProps } from './TaskLists';
import TaskProgress from './TaskProgress';

import KebabIcon from '../components/icons/KebabIcon';
import styles from './teampage.module.css';

const COLORS = ['purple', 'blue', 'cyan', 'pink', 'rose', 'orange', 'yellow'];

export default function TaskListsItem({
  name,
  taskTotal,
  taskComplete,
  displayIndex,
}: TaskListProps) {
  const borderColor = 'border-' + COLORS[displayIndex % COLORS.length];

  return (
    <li className={cn(borderColor, styles.task)}>
      <h3 className="mr-2 truncate text-md font-medium">{name}</h3>

      <span className="ml-auto">
        <TaskProgress
          count={taskComplete}
          total={taskTotal}
        />
      </span>

      <button className={styles.iconButton}>
        <KebabIcon />
      </button>
    </li>
  );
}
