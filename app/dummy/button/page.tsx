import Button from '@/app/components/Button';

export default function ButtonPage() {
  return (
    <div className="mt-5 flex gap-4">
      <Button href="/login">링크테스트</Button>
      <Button
        styleType="outlined"
        href="/signup"
      >
        링크테스트
      </Button>
    </div>
  );
}
