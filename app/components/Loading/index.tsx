import { cn } from '@/app/libs/utils';
import LoadIcon from '../icons/LoadIcon';

interface Props {
  /** 출력할 텍스트 */
  text?: string;
  /** 전체 스타일 추가 클래스 */
  classname?: string;
  /** 아이콘 추가 클래스 */
  iconClassname?: string;
  /** 텍스트 추가 클래스 */
  textClassname?: string;
}

/**
 * 로딩 컴포넌트
 * @param props
 * @param props.text 출력할 텍스트
 * @param props.classname 전체 스타일 추가 클래스
 * @param props.iconClassname 아이콘 추가 클래스
 * @param props.textClassname 텍스트 추가 클래스
 */
export default function Loading({
  text = 'Loading...',
  classname = '',
  iconClassname = '',
  textClassname = '',
}: Props) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-4 p-4 text-primary',
        classname
      )}
    >
      <LoadIcon classname={iconClassname} />
      <span className={cn('text-lg font-bold', textClassname)}>{text}</span>
    </div>
  );
}
