import BestCard from './BestCardList';
import CardList from './CardList';

export default function boards() {
  return (
    <>
      <h1>베스트 게시글</h1>
      <BestCard />
      <h1>게시글</h1>
      <CardList />
    </>
  );
}
