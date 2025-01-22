import BestCard from './BestCardList';
import CardList from './CardList';

export default function boards() {
  return (
    <div className="mb:w-[90%] mx-auto flex flex-col items-center sm:w-[90%] lg:w-[65%]">
      <div className="w-full">
        <h1>베스트 게시글</h1>
        <BestCard />
        <h1>게시글</h1>
        <CardList />
      </div>
    </div>
  );
}
