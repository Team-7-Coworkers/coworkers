interface Props {
  classname?: string;
  rate?: number;
  frontColor?: string;
  backColor?: string;
}

const MAX_LENGTH = 5 * 2 * 3.14;

export default function CircleGraphIcon({
  classname = '',
  rate = 0,
  frontColor = '#10b981',
  backColor = '#F8FAFC',
}: Props) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classname}
    >
      <circle
        cx="8.5"
        cy="8.5"
        r="5"
        stroke={backColor}
        strokeWidth="2.1128"
      />
      {rate !== 0 && (
        <circle
          cx="8.5"
          cy="8.5"
          r="5"
          stroke={frontColor}
          strokeWidth="2.1128"
          strokeLinecap="round"
          strokeDasharray={`${rate * MAX_LENGTH} ${MAX_LENGTH}`}
        />
      )}
    </svg>
  );
}
