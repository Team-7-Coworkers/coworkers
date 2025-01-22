import { cn } from '../libs/utils';

import KebabIcon from '../components/icons/KebabIcon';
import TaskProgress from './TaskProgress';

import styles from './teampage.module.css';

interface Props {
  name: string;
  taskTotal: number;
  taskComplete: number;
  displayIndex: number;
}

const COLORS = ['purple', 'blue', 'cyan', 'pink', 'rose', 'orange', 'yellow'];

export default function TaskListItem({
  name,
  taskTotal,
  taskComplete,
  displayIndex,
}: Props) {
  const borderColor = 'border-' + COLORS[displayIndex % COLORS.length];

  return (
    <li className={cn(borderColor, styles.item)}>
      <h3 className="text-md font-medium">{name}</h3>
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
