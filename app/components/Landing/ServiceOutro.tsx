'use client';
import Image from 'next/image';
import landingBottomSmall from '@/public/images/landing/landing-bottom-small.png';
import landingBottomMedium from '@/public/images/landing/landing-bottom-medium.png';
import landingBottomLarge from '@/public/images/landing/landing-bottom-large.png';
import { useEffect, useState } from 'react';

export default function ServiceOut() {
  const [imageSrc, setImageSrc] = useState(landingBottomSmall);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setImageSrc(landingBottomSmall);
      } else if (window.innerWidth <= 1024) {
        setImageSrc(landingBottomMedium);
      } else {
        setImageSrc(landingBottomLarge);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full text-center">
      <div className="absolute top-[123px] flex w-full flex-col items-center gap-4 text-t-primary sm:top-[176px] sm:gap-2 lg:top-[230px] lg:gap-6">
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
        src={imageSrc}
        alt=""
        layout="responsive"
      />
    </div>
  );
}
