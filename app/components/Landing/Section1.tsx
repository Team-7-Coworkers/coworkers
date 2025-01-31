'use client';

import Image from 'next/image';
import landingMockup01 from '@/public/images/landing/landing-mockup-01.png';
import folderIcon from '@/public/images/icons/ic_folder.svg';
import { motion } from 'framer-motion';

export default function Section1() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      viewport={{ amount: 0.4 }}
    >
      <div className="mx-auto mb-6 max-w-[996px] rounded-[40px] bg-gradient-to-r from-primary to-tertiary p-[1.3px] shadow-[0_0_12px_2px_rgba(255,255,255,0.25)] backdrop-blur-lg lg:mb-20">
        <div className="z-10 flex h-full w-full flex-col items-center justify-end gap-10 rounded-[40px] bg-b-primary sm:flex-row sm:justify-center sm:gap-[100px] lg:gap-[193px]">
          <Image
            className="hidden sm:mt-[81px] sm:block"
            width={235}
            height={273}
            src={landingMockup01}
            alt=""
            unoptimized
          />
          <div className="flex w-[235px] flex-col items-start gap-4 sm:w-auto">
            <div className="mt-12 flex h-12 w-12 items-center justify-center rounded-xl border border-[#F8FAFC] border-opacity-10 bg-b-secondary shadow-[0_0_12px_2px_rgba(0,0,0,0.25)] sm:m-0">
              <Image
                src={folderIcon}
                alt=""
                width={24}
                height={24}
                unoptimized
              />
            </div>
            <p className="text-[18px] font-medium leading-[21px] lg:text-2xl">
              그룹으로
              <br />할 일을 관리해요
            </p>
          </div>
          <Image
            className="sm:hidden"
            width={235}
            height={273}
            src={landingMockup01}
            alt=""
            unoptimized
          />
        </div>
      </div>
    </motion.div>
  );
}
