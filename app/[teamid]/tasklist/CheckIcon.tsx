interface Props {
  classname?: string;
  color?: string;
}

export default function CheckIcon({
  classname = '',
  color = '#F8FAFC',
}: Props) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classname}
    >
      <path
        d="M4 7.14286L6.90909 10L12 5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
