interface Props {
  classname?: string;
  color?: string;
}

export default function SubmitIcon({
  classname = '',
  color = '#64748B',
}: Props) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classname}
    >
      <circle
        cx="12"
        cy="12"
        r="12"
        fill={color}
      />
      <path
        d="M8 11L12 7M12 7L16 11M12 7V16"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
