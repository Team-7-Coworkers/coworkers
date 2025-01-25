import { cn } from '../libs/utils';
import CircleGraph from './CircleGraph';
import styles from './teampage.module.css';

interface Props {
  /** 할 일 전체 갯수 */
  total: number;
  /** 할 일 완료한 갯수 */
  complete: number;
}

export default function Report({ total, complete }: Props) {
  // 비율 개산
  const rate = total === 0 ? 0 : complete / total;

  return (
    <section className={styles.section}>
      <h2 className={cn(styles.title, 'mb-4')}>리포트</h2>

      <div className="relative flex items-center gap-6 rounded-xl bg-b-secondary p-6">
        <CircleGraph
          rate={rate}
          classnames="flex-1 max-w-[170px]"
        />

        <div className="absolute left-[20%] flex-1 text-center sm:static sm:ml-12 sm:text-left">
          <h3 className="text-xs font-medium sm:hidden">오늘</h3>
          <h3 className="mb-1 hidden text-md font-medium sm:block">
            오늘의
            <br />
            진행 상황
          </h3>
          <div className="text-gradient text-xl font-bold sm:text-4xl">
            {Math.floor(rate * 100)}%
          </div>
        </div>

        <div className="ml-auto flex w-1/2 flex-col gap-4 sm:w-[280px] lg:w-[400px]">
          <div
            className={cn(
              styles.reportBox,
              'bg-[url(/images/icons/icon-user.svg)]'
            )}
          >
            <h4 className={styles.reportTitle}>오늘의 할 일</h4>
            <div className={styles.reportCount}>{total}개</div>
          </div>

          <div
            className={cn(
              styles.reportBox,
              'bg-[url(/images/icons/icon-done.svg)]'
            )}
          >
            <h4 className={styles.reportTitle}>한 일</h4>
            <div className={styles.reportCount}>{complete}개</div>
          </div>
        </div>
      </div>
    </section>
  );
}
