'use client';
import AddButton from './AddButton';
import ListCategory from './ListCategory';
import ListHeader from './ListHeader';

export default function ListPage() {
  return (
    <div className="relative min-h-[700px]">
      {/* GNB는 비워두겠습니다!
        페이지에 적용할 기본 패딩이랑 요소 얘기하기
        현재 레이아웃부터 구현하고 있기 때문에 {teamid}가 아닌 teamid/tasklist 에서 작업
        */}
      <h1 className="mb-10 mt-8 text-2lg font-bold text-t-primary sm:text-xl">
        할 일
      </h1>
      <ListHeader />
      <div className="mt-5 sm:mt-6 lg:mt-8">
        <ListCategory />
      </div>
      <AddButton />
    </div>
  );
}
