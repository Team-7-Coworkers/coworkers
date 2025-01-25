import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container">
      <h1>Not Found</h1>
      <p>요청한 페이지를 찾을 수 없습니다.</p>
      <Link href="/">홈 페이지로 가기</Link>
    </div>
  );
}
