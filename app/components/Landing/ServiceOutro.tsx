'use client';
import Image from 'next/image';
import landingBottom from '@/public/images/landing/landing-bottom.png';

export default function ServiceOut() {
  return (
    <div className="relative w-full text-center">
      <div className="absolute top-[50px] flex w-full flex-col items-center gap-4 text-t-primary sm:top-[76px] sm:gap-2 lg:top-[130px] lg:gap-6">
        <p className="text-2xl font-semibold sm:text-4xl">
          지금 바로 시작해보세요
        </p>
        <div className="flex flex-col items-center text-lg sm:hidden">
          <p>팀원 모두와 같은 방향,</p>
          <p>같은 속도로 나아가는 가장 쉬운 방법</p>
        </div>
        <p className="hidden text-2xl sm:block">
          팀원 모두와 같은 방향, 같은 속도로 나아가는 가장 쉬운 방법
        </p>
      </div>
      <Image
        src={landingBottom}
        alt=""
        layout="responsive"
      />
    </div>
  );
}
