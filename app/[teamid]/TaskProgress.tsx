import CircleGraphIcon from './CircleGraphIcon';
import DoneIcon from '../components/icons/DoneIcon';
import styles from './teampage.module.css';

interface Props {
  count: number;
  total: number;
}

export default function TaskProgress({ count, total }: Props) {
  const rate = count === 0 ? 0 : count / total;

  return (
    <div className={styles.progress}>
      {rate === 1 ? <DoneIcon /> : <CircleGraphIcon rate={rate} />}
      {count}/{total}
    </div>
  );
}
