import Link from 'next/link';
// import Button from './components/Button';

export default function NotFound() {
  return (
    <div className="container mt-48 flex items-center justify-center">
      <h1 className="text-3xl font-semibold">Not Found</h1>

      <div className="ml-6 border-l border-bd-primary pl-6">
        <p className="mb-3">요청한 페이지를 찾을 수 없습니다.</p>
        <Link
          href="/"
          className="text-primary underline"
        >
          홈 페이지로 가기 &rarr;
        </Link>
      </div>
    </div>
  );
}
