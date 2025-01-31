'use client';

import Image from 'next/image';
import landingMockup03 from '@/public/images/landing/landing-mockup-03.png';
import doneIcon from '@/public/images/icons/ic_done.svg';
import { motion } from 'framer-motion';

export default function Section3() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      viewport={{ amount: 0.4 }}
    >
      <div className="mx-auto max-w-[996px] rounded-[40px] backdrop-blur-lg">
        <div className="flex h-full w-full flex-col items-center justify-end gap-10 rounded-[40px] bg-[#020617] sm:flex-row sm:justify-center sm:gap-[100px] lg:gap-[193px]">
          <Image
            className="sm:mb-[81px]"
            width={235}
            height={273}
            src={landingMockup03}
            alt=""
            unoptimized
          />
          <div className="flex w-[235px] flex-col items-start gap-4 sm:w-auto">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#F8FAFC] border-opacity-10 bg-b-secondary shadow-[0_0_12px_2px_rgba(0,0,0,0.25)] sm:m-0">
              <Image
                src={doneIcon}
                alt=""
                width={24}
                height={24}
                unoptimized
              />
            </div>
            <p className="mb-12 text-[18px] font-medium leading-[21px] sm:m-0 lg:text-2xl">
              할 일도 간편하게
              <br />
              체크해요
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
