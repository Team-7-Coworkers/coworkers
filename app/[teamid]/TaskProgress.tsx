import CircleGraphIcon from './CircleGraphIcon';
import DoneIcon from '../components/icons/DoneIcon';
import styles from './teampage.module.css';

interface Props {
  done: number;
  total: number;
}

export default function TaskProgress({ done, total }: Props) {
  // 비율 계산
  const rate = done === 0 ? 0 : done / total;

  return (
    <div className={styles.progress}>
      {rate === 1 ? <DoneIcon /> : <CircleGraphIcon rate={rate} />}
      {done}/{total}
    </div>
  );
}
