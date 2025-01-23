export default function Checkbox({
  id,
  checked,
  onChange,
}: {
  id: number;
  checked: boolean;
  onChange: (id: number) => void;
}) {
  return (
    <div className="relative h-5 w-5">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange(id)}
        className="h-5 w-5 cursor-pointer appearance-none rounded-md border border-ic-inverse checked:border-transparent checked:bg-tertiary focus:outline-none"
      />
      {checked && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 7.14286L6.90909 10L12 5"
              stroke="#F8FAFC"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
