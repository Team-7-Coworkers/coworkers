'use client';
import Image from 'next/image';
import landingMainSmall from '@/public/images/landing/landing-main-small.png';
import landingMainMedium from '@/public/images/landing/landing-main-medium.png';
import landingMainLarge from '@/public/images/landing/landing-main-large.png';
import RepairIcon from '@/public/images/icons/ic_repair.svg';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ServiceIntro() {
  const [imageSrc, setImageSrc] = useState(landingMainSmall);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setImageSrc(landingMainSmall);
      } else if (window.innerWidth <= 1024) {
        setImageSrc(landingMainMedium);
      } else {
        setImageSrc(landingMainLarge);
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
      <Image
        src={imageSrc}
        alt=""
        layout="responsive"
        priority
      />
      <div className="absolute top-[55px] flex w-full flex-col items-center gap-1 sm:top-[100px] sm:gap-2 lg:top-[84px] lg:gap-5">
        <div className="flex items-center gap-1 sm:gap-4 lg:gap-6">
          <h1 className="text-2xl font-semibold text-t-primary sm:text-4xl lg:text-[48px] lg:leading-[57.28px]">
            함께 만들어가는 투두 리스트
          </h1>
          <Image
            src={RepairIcon}
            alt=""
            className="h-7 w-7 sm:h-12 sm:w-12 lg:h-16 lg:w-16"
          />
        </div>
        <h1 className="bg-gradient-to-r from-primary to-tertiary bg-clip-text text-3xl font-semibold text-transparent sm:text-[48px] sm:leading-[57.28px] lg:text-[64px] lg:leading-[76.38px]">
          Cowerkers
        </h1>
      </div>
      <Link href="/login">
        <button className="relative bottom-12 w-[343px] rounded-[32px] bg-gradient-to-r from-primary to-tertiary py-[13px] text-lg font-semibold sm:bottom-[120px] sm:w-[373px] sm:py-[14.5px]">
          지금 시작하기
        </button>
      </Link>
    </div>
  );
}
