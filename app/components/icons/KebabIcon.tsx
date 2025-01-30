import IconProps from './icon.type';

export default function KebabIcon({ classname = '' }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={classname}
    >
      <circle
        cx="8"
        cy="5"
        r="1"
      />
      <circle
        cx="8"
        cy="8"
        r="1"
      />
      <circle
        cx="8"
        cy="11"
        r="1"
      />
    </svg>
  );
}
