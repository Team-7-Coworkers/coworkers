export default function LoadingMyhistory() {
  return (
    <div className="mt-[60px] space-y-10">
      {[...Array(5)].map((_, i) => (
        <div key={i}>
          <div className="mb-4 h-[19px] w-[130px] animate-pulse rounded-lg bg-gray-500" />
          <div className="mb-4 h-11 w-full animate-pulse rounded-lg bg-gray-700" />
          <div className="mb-4 h-11 w-full animate-pulse rounded-lg bg-gray-700" />
          <div className="h-11 w-full animate-pulse rounded-lg bg-gray-700" />
        </div>
      ))}
    </div>
  );
}
