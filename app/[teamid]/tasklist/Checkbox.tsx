import CheckIcon from './task-icon/CheckIcon';

export default function Checkbox({
  id,
  checked,
  onChange,
}: {
  id: number;
  checked: boolean;
  onChange: (id: number, checked: boolean) => void;
}) {
  return (
    <div className="relative flex h-4 w-4 items-center justify-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(id, e.target.checked)}
        className="h-full w-full cursor-pointer appearance-none rounded-md border border-ic-inverse checked:border-transparent checked:bg-tertiary focus:outline-none"
      />
      {checked && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <CheckIcon />
        </div>
      )}
    </div>
  );
}
