import ListDate from './ListDate';

type ListHeaderProps = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
};

export default function ListHeader({
  selectedDate,
  setSelectedDate,
}: ListHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <ListDate
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <p className="ml-3 cursor-pointer truncate text-md text-primary sm:ml-5">
        + 새로운 목록 추가하기
      </p>
    </div>
  );
}
