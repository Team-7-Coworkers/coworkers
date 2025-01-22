import BestCard from './BestCardList';
import CardList from './CardList';

export default function boards() {
  return (
    <div className="mx-auto flex w-[70%] flex-col items-center">
      <div className="w-full">
        <h1>베스트 게시글</h1>
        <BestCard />
        <h1>게시글</h1>
        <CardList />
      </div>
    </div>
  );
}
