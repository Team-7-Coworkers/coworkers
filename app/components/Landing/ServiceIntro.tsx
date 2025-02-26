'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import useUserStore from '@/app/stores/userStore';
import useTeamStore from '@/app/stores/teamStore';
import { IMAGE_SIZES } from '@/app/constants/image';
import landingMain from '@/public/images/landing/landing-main.png';
import RepairIcon from '@/public/images/icons/ic_repair.svg';

export default function ServiceIntro() {
  const { user } = useUserStore();
  const { teamList, currentTeam } = useTeamStore();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const getRedirectPath = () => {
    if (!user) return '/login';
    if (teamList.length === 0) return '/noteam';
    return `${currentTeam?.id}`;
  };

  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden text-center">
      <motion.div
        className="relative h-[640px] overflow-hidden sm:h-[940px] lg:h-[1080px]"
        initial={{ opacity: 0, y: 20 }}
        animate={isImageLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Image
          className="object-cover"
          fill
          src={landingMain}
          alt=""
          priority
          sizes={IMAGE_SIZES}
          onLoadingComplete={() => setIsImageLoaded(true)}
        />
      </motion.div>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="bg-gradient-to-r from-primary to-tertiary bg-clip-text text-3xl font-semibold text-transparent sm:text-[48px] sm:leading-[57.28px] lg:text-[64px] lg:leading-[76.38px]">
            Coworkers
          </h1>
        </motion.div>
      </div>
      <Link href={getRedirectPath()}>
        <motion.button
          className="relative bottom-12 w-[343px] rounded-[32px] bg-gradient-to-r from-primary to-tertiary py-[13px] text-lg font-semibold sm:bottom-[119px] sm:w-[373px] sm:py-[14.5px] lg:bottom-[160px]"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          지금 시작하기
        </motion.button>
      </Link>
    </div>
  );
}
