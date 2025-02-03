interface DailyTask {
  doneAt: string;
  names: string[];
}

type DailyItemListProps = {
  dailyTasks: DailyTask[];
};

export default function DailyItemList({ dailyTasks }: DailyItemListProps) {
  return (
    <div>
      {dailyTasks.map(({ doneAt, names }) => (
        <div key={doneAt}>
          <h3>{doneAt}</h3>
          <div>
            {/* 체크박스 넣기 */}
            {names.map((name, i) => {
              return <p key={i}>{name}</p>;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
