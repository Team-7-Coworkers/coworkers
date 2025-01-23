import Image from 'next/image';
import styles from './teampage.module.css';
import { cn } from '../libs/utils';
// import KebabIcon from '../components/icons/KebabIcon';

interface Props {
  id: number;
  image?: string;
  name: string;
  email: string;
  onClick: (userId: number) => void;
}

export default function MemberListItem({
  id,
  image,
  name,
  email,
  onClick,
}: Props) {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <li>
      <button
        type="button"
        className={styles.member}
        onClick={handleClick}
      >
        <figure className={cn(styles.memberFigure, 'size-8')}>
          <Image
            src={image || '/images/icons/icon-base-user.svg'}
            width="26"
            height="26"
            alt=""
            className="mx-auto"
          />
        </figure>

        <div className="ml-3 flex-1 overflow-hidden">
          <div className="truncate text-md font-medium">{name}</div>
          <div className="mt-[2px] truncate text-sm text-t-secondary">
            {email}
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
