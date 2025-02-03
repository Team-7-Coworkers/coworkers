import Image from 'next/image';

interface DailyTask {
  doneAt: string;
  names: string[];
}

type DailyItemListProps = {
  dailyTasks: DailyTask[];
};

export default function DailyItemList({ dailyTasks }: DailyItemListProps) {
  return (
    <div className="mb-10 flex flex-col gap-10">
      {dailyTasks.map(({ doneAt, names }) => (
        <div key={doneAt}>
          <h3 className="mb-4 text-lg font-medium text-t-primary">{doneAt}</h3>
          <div className="flex flex-col gap-4">
            {names.map((name, i) => {
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-lg bg-b-secondary px-[14px] py-[10px]"
                >
                  <Image
                    src="/images/icons/ic_checked-box.svg"
                    alt="완료 체크"
                    width={24}
                    height={24}
                  />
                  <p className="truncate text-md font-normal text-t-primary line-through">
                    {name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
