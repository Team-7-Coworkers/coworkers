import TaskListsItem from './TaskListsItem';
import styles from './teampage.module.css';

export type TaskListProps = {
  displayIndex: number;
  name: string;
  id: number;
  taskTotal: number;
  taskComplete: number;
};

interface Props {
  taskLists: TaskListProps[];
}

export default function TaskLists({ taskLists }: Props) {
  return (
    <section className={styles.section}>
      <header className={styles.sectionheader}>
        <h2 className={styles.title}>할 일 목록</h2>
        <span className="ml-2 text-lg text-t-default">
          ({taskLists.length}개)
        </span>

        <button className="text-button ml-auto text-md">
          + 새로운 목록 추가하기
        </button>
      </header>

      <ul>
        {taskLists.map((taskList) => (
          <TaskListsItem
            key={taskList.id}
            {...taskList}
          />
        ))}
      </ul>
    </section>
  );
}
