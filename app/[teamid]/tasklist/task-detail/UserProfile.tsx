'use client';

import Image from 'next/image';
import ProfileImg from '@/public/images/icons/icon-base-user.svg';
import { useState } from 'react';

interface UserProfileProps {
  image?: string | null;
  nickname: string;
}

export default function UserProfile({ image, nickname }: UserProfileProps) {
  const [imgSrc, setImgSrc] = useState(image || ProfileImg);
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-bd-primary/10 bg-b-tertiary">
        <Image
          src={imgSrc}
          alt={`${nickname}의 프로필`}
          layout="fill"
          objectFit="cover"
          priority
          className="rounded-full"
          onError={() => setImgSrc(ProfileImg)}
        />
      </div>
      <span className="text-md font-medium text-t-primary">{nickname}</span>
    </div>
  );
}
