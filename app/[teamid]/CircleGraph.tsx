interface Props {
  rate?: number;
}

const MAX_LENGTH = 70 * 2 * 3.14;

export default function CircleGraph({ rate = 0 }: Props) {
  return (
    <svg
      width="170"
      height="170"
      viewBox="0 0 170 170"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="85"
        cy="85"
        r="70"
        stroke="#334155"
        strokeWidth="29.5793"
      />
      {rate !== 0 && (
        <circle
          cx="85"
          cy="85"
          r="70"
          stroke="url(#gradient)"
          strokeWidth="29.5793"
          strokeLinecap="round"
          strokeDasharray={`${rate * MAX_LENGTH} ${MAX_LENGTH}`}
        />
      )}
      <defs>
        <linearGradient
          id="gradient"
          x1="85"
          y1="120.5"
          x2="155"
          y2="120.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#10B981" />
          <stop
            offset="1"
            stopColor="#A3E635"
          />
        </linearGradient>
      </defs>
    </svg>
  );
}
