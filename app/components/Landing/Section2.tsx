'use client';

import Image from 'next/image';
import landingMockup02 from '@/public/images/landing/landing-mockup-02.png';
import messageIcon from '@/public/images/icons/ic_message.svg';
import { motion } from 'framer-motion';

export default function Section2() {
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
      <div className="mx-auto mb-6 max-w-[996px] rounded-[40px] border border-[#F8FAFC] border-opacity-10 backdrop-blur-lg lg:mb-20">
        <div className="flex h-full w-full flex-col items-center justify-end gap-10 rounded-[40px] bg-b-secondary sm:flex-row sm:justify-center sm:gap-[100px] lg:gap-[193px]">
          <Image
            className="sm:hidden"
            width={235}
            height={273}
            src={landingMockup02}
            alt=""
          />
          <div className="flex w-[235px] flex-col items-start gap-4 sm:w-auto sm:items-end sm:text-end">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#F8FAFC] border-opacity-10 bg-b-secondary shadow-[0_0_12px_2px_rgba(0,0,0,0.25)] sm:m-0">
              <Image
                src={messageIcon}
                alt=""
                width={24}
                height={24}
              />
            </div>
            <p className="mb-12 text-[18px] font-medium leading-[21px] sm:m-0 lg:text-2xl">
              간단하게 멤버들을
              <br />
              초대해요
            </p>
          </div>
          <Image
            className="hidden sm:mb-[81px] sm:block"
            width={235}
            height={273}
            src={landingMockup02}
            alt=""
          />
        </div>
      </div>
    </motion.div>
  );
}
