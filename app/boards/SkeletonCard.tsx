export default function SkeletonCard({
  className,
  variant = 'best',
}: {
  className?: string;
  variant?: 'best' | 'list';
}) {
  return (
    <div
      className={`flex animate-pulse rounded-[12px] border border-gray-700 bg-b-secondary px-[32px] py-[24px] ${className}`}
    >
      <div className="flex flex-1 flex-col justify-between">
        {variant === 'best' && (
          <div className="mb-[15px] mt-2 h-[13px] w-1/4 rounded-md bg-gray-500" />
        )}

        <div className="flex items-center gap-4">
          <div className="flex flex-1 flex-col">
            <div className="mb-2 h-[17px] w-3/4 rounded-md bg-gray-500" />
            <div className="mb-4 h-[17px] w-1/2 rounded-md bg-gray-500" />
          </div>
          <div className="flex-shrink-0">
            <div className="h-[72px] w-[72px] rounded-md bg-gray-500" />
          </div>
        </div>

        <div className="mt-auto flex w-full justify-between">
          <div className="h-[14px] w-[80px] rounded-md bg-gray-500" />
        </div>
      </div>
    </div>
  );
}
