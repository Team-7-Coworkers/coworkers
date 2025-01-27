import { cn } from '@/app/libs/utils';
import type IconProps from './icon.type';

export default function LoadIcon({ classname }: IconProps) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('spin', classname)}
    >
      <path
        d="M2.74513 16C-0.915042 19.6602 -0.915042 25.5946 2.74513 29.2548C6.40529 32.9151 12.3396 32.9151 15.9998 29.2548C19.6599 32.9151 25.5947 32.9151 29.2549 29.2548C32.915 25.5946 32.915 19.6602 29.2549 16C32.9148 12.3398 32.9145 6.40531 29.2544 2.74517C25.5943 -0.914978 19.6602 -0.915055 16 2.74494C12.3398 -0.915055 6.40568 -0.914978 2.74559 2.74517C-0.914503 6.40531 -0.914811 12.3398 2.74513 16Z"
        fill="currentColor"
      />
    </svg>
  );
}
