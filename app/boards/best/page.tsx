'use client';

import { Suspense } from 'react';
import Image from 'next/image';

import CardList from '../CardList';

import bestIcon from '@/public/images/icons/ic_medal.svg';

export default function BestPage() {
  return (
    <div className="mx-auto flex w-[90%] flex-col items-center pb-14 pt-5 sm:w-[90%] lg:w-[65%]">
      <Image
        src={bestIcon}
        alt=""
        className="h-auto w-[100px] pb-1"
      />
      <p className="pb-8 text-[30px] font-semibold">베스트 게시글</p>
      <div className="w-full">
        <Suspense fallback={<></>}>
          <CardList
            keyword=""
            orderBy="like"
            hideItem={true}
          />
        </Suspense>
      </div>
    </div>
  );
}
