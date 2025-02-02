import { notFound } from 'next/navigation';

export default function DummyPage() {
  // 개발 환경에서만 접근 가능하도록 수정
  if (process.env.NODE_ENV !== 'development') {
    return notFound();
  }

  return (
    <>
      <h1 className="my-2 text-xl font-bold">Dummy Pages</h1>

      <p className="mt-4">
        다양한 컴포넌트를 테스트하고, 코드 사용 방법을 남겨두기 위한 장소입니다.
      </p>
    </>
  );
}
