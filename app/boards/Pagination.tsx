'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const onPageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mt-6 flex justify-center space-x-2 py-8">
      <button
        className={`rounded-md border px-3 py-2 ${
          currentPage === 1
            ? 'cursor-not-allowed border-gray-600 bg-gray-700'
            : 'border-gray-700 bg-b-primary'
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ◁
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`rounded-md border px-4 py-2 ${
            page === currentPage
              ? 'border-gray-700 bg-primary text-white'
              : 'border-gray-700 bg-b-primary text-gray-300'
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={`rounded-md border px-3 py-2 ${
          currentPage === totalPages
            ? 'cursor-not-allowed border-gray-600 bg-gray-700'
            : 'border-gray-700 bg-b-primary'
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ▷
      </button>
    </div>
  );
}
