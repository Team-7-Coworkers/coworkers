import Image from 'next/image';

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
          <Image
            src="/images/icons/icon-check.svg"
            alt="체크"
            width={16}
            height={16}
          />
        </div>
      )}
    </div>
  );
}
