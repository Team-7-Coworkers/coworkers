import { cn } from '../libs/utils';

import type { MemberProps } from './MemberList';
import Img from '../components/Img';

// import KebabIcon from '../components/icons/KebabIcon';
import styles from './teampage.module.css';

interface Props extends MemberProps {
  onClick: (userId: number) => void;
}

export default function MemberListItem({
  userId,
  userImage,
  userName,
  userEmail,
  onClick,
}: Props) {
  // 멤버 클릭 함수
  const handleClick = () => {
    onClick(userId);
  };

  return (
    <li>
      <button
        type="button"
        className={styles.member}
        onClick={handleClick}
      >
        <figure className={cn(styles.memberFigure, 'size-8')}>
          <Img
            src={userImage}
            baseImage="/images/icons/icon-base-user.svg"
            width="26"
            height="26"
            alt=""
            className="mx-auto"
          />
        </figure>

        <div className="ml-3 flex-1 overflow-hidden">
          <div className="truncate text-md font-medium">{userName}</div>
          <div className="mt-[2px] truncate text-sm text-t-secondary">
            {userEmail}
          </div>
        </div>

        {/* <div className="ml-auto">
          <button className={styles.iconButton}>
            <KebabIcon />
          </button>
        </div> */}
      </button>
    </li>
  );
}
