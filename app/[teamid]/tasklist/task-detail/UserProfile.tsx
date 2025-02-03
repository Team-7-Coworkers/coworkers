'use client';

import Image from 'next/image';
import ProfileImg from '@/public/images/icons/icon-base-user.svg';

interface UserProfileProps {
  image?: string | null;
  nickname: string;
}

export default function UserProfile({ image, nickname }: UserProfileProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full border border-bd-primary/10 bg-b-tertiary`}
      >
        <Image
          src={image || ProfileImg}
          alt={`${nickname}의 프로필`}
          width={25}
          height={25}
          className="rounded-full object-cover"
        />
      </div>
      <span className="text-md font-medium text-t-primary">{nickname}</span>
    </div>
  );
}
