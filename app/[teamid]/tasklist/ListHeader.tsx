import ListDate from './ListDate';

export default function ListHeader() {
  return (
    <div className="flex items-center justify-between">
      <ListDate />
      <p className="ml-3 cursor-pointer truncate text-md text-primary sm:ml-5">
        + 새로운 목록 추가하기
      </p>
    </div>
  );
}
