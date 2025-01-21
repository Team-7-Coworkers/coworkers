import ListHeader from './ListHeader';

export default function ListPage() {
  return (
    <div>
      {/* GNB는 비워두겠습니다!
        페이지에 적용할 기본 패딩이랑 요소 얘기하기 */}
      <h1 className="mb-10 mt-8 text-2lg font-bold text-t-primary sm:text-xl">
        할 일
      </h1>
      <ListHeader />
    </div>
  );
}
