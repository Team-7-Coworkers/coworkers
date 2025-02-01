import Button from '../components/Button';
// import bgNoTeam from '@/public/images/bg-no-team.png';
import Link from 'next/link';

export default function NoTeamPage() {
  return (
    <div className="mt-[190px] px-8 sm:px-[112px] lg:mx-auto">
      <div className="flex flex-col items-center gap-8 sm:gap-12">
        <div className="aspect-[810/255] w-full max-w-[810px] bg-[url('/images/bg-no-team.png')] bg-contain" />
        <p className="text-center text-md text-t-default lg:text-lg">
          아직 소속된 팀이 없습니다.
          <br />
          팀을 생성하거나 팀에 참여해 보세요
        </p>
      </div>
      <div className="mt-[48px] flex flex-col items-center gap-2 sm:mt-[80px] lg:gap-4">
        <Link href="/addteam">
          <Button size="w-[186px] h-[48px] rounded-xl">팀 생성하기</Button>
        </Link>
        <Link href="/invitation">
          <Button size="w-[186px] h-[48px] rounded-xl bg-transparent border border-primary text-[#10B981] hover:border-i-pressed hover:bg-i-inactive hover:bg-opacity-15 active:border-i-pressed active:bg-[#94A3B8] active:bg-opacity-5">
            팀 참여하기
          </Button>
        </Link>
      </div>
    </div>
  );
}
