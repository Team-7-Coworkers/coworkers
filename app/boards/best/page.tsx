'use client';

import CardList from '../CardList';
import bestIcon from '@/public/images/icons/ic_medal.svg';
import Image from 'next/image';

export default function BestPage() {
  return (
    <div className="mx-auto flex w-[90%] flex-col items-center pb-20 pt-10 sm:w-[90%] lg:w-[65%]">
      <Image
        src={bestIcon}
        alt=""
        className="h-auto w-[100px] pb-1"
      />
      <p className="pb-8 text-[30px] font-semibold">베스트 게시글</p>
      <div className="w-full">
        <CardList
          keyword=""
          orderBy="like"
          hideItem={true}
        />
      </div>
    </div>
  );
}
