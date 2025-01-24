'use client';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="mt-6 flex justify-center space-x-2 py-8">
      <button
        className="rounded-md border border-gray-700 bg-b-primary px-3 py-2"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ◁
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`rounded-md border border-gray-700 px-4 py-2 ${
            page === currentPage ? 'bg-primary' : 'bg-b-primary'
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="rounded-md border border-gray-700 bg-b-primary px-3 py-2"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ▷
      </button>
    </div>
  );
}
