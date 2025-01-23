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
    <div className="relative flex h-4 w-4 items-center justify-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange(id)}
        className="h-full w-full cursor-pointer appearance-none rounded-md border border-ic-inverse checked:border-transparent checked:bg-tertiary focus:outline-none"
      />
      {checked && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <svg
            width="12"
            height="12"
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
