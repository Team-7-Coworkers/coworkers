import ListDate from './ListDate';

export default function ListHeader() {
  return (
    <div className="flex items-center justify-between">
      <ListDate />
      <p className="cursor-pointer text-md text-primary">
        + 새로운 목록 추가하기
      </p>
    </div>
  );
}
