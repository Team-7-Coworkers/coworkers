'use client';

import CardList from '../CardList';

export default function BestPage() {
  return (
    <div className="mx-auto flex w-[90%] flex-col items-center pt-20 sm:w-[90%] lg:w-[65%]">
      <CardList
        keyword=""
        orderBy="like"
        hideItem={true}
      />
    </div>
  );
}
