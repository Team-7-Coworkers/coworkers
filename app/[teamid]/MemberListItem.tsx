import Link from 'next/link';

import { cn } from '../libs/utils';

import type { MemberProps } from './MemberList';
import Img from '../components/Img';

import CrownIcon from '../components/icons/CrownIcon';
import TrashIcon from '../components/icons/TrashIcon';
import styles from './teampage.module.css';

interface Props extends MemberProps {
  editable: boolean;
  onDetailClick: (userId: number) => void;
  onDeleteClick: (userId: number) => void;
}

export default function MemberListItem({
  userId,
  userImage,
  userName,
  userEmail,
  role,
  editable = false,
  onDetailClick,
  onDeleteClick,
}: Props) {
  // 멤버 클릭 함수
  const handleNameClick = () => {
    onDetailClick(userId);
  };

  // 맴버 제외 클릭 함수
  const handleDeleteClick = () => {
    onDeleteClick(userId);
  };

  return (
    <li className={styles.member}>
      <figure className={cn(styles.memberFigure, 'size-8')}>
        <Img
          src={userImage}
          baseImage="/images/icons/icon-base-user.svg"
          width={userImage ? 30 : 26}
          height={userImage ? 30 : 26}
          alt=""
          className={cn(
            userImage && 'size-[30px]',
            'mx-auto rounded-full object-cover'
          )}
        />
        {role === 'ADMIN' && (
          <CrownIcon classname="absolute text-tertiary size-4 -right-1 -top-1 rotate-[30deg]" />
        )}
      </figure>

      <div className="ml-3 flex flex-1 flex-col items-start gap-1 overflow-hidden">
        <button
          className="text-button max-w-full truncate text-left text-md font-medium"
          onClick={handleNameClick}
        >
          {userName}
        </button>
        <Link
          href={`mailto:${userEmail}`}
          className="max-w-full truncate text-sm text-t-secondary hover:underline"
        >
          {userEmail}
        </Link>
      </div>

      {editable && role !== 'ADMIN' && (
        <div className="ml-auto">
          <button
            className={cn(styles.iconButton, 'tool-tip')}
            onClick={handleDeleteClick}
            aria-label="멤버 제외"
          >
            <TrashIcon classname="size-4" />
          </button>
        </div>
      )}
    </li>
  );
}
