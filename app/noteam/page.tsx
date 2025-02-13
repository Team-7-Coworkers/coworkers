import Image from 'next/image';
import Button from '../components/Button';

export default function NoTeamPage() {
  return (
    <div className="mt-[190px] px-8 sm:px-[112px] lg:mx-auto">
      <div className="flex flex-col items-center gap-8 sm:gap-12">
        <div className="w-full max-w-[810px]">
          <Image
            src="/images/bg-no-team.png"
            alt=""
            priority
            width={810}
            height={255}
            className="object-contain"
          />
        </div>
        <p className="text-center text-md text-t-default lg:text-lg">
          아직 소속된 팀이 없습니다.
          <br />
          팀을 생성하거나 팀에 참여해 보세요
        </p>
      </div>
      <div className="mt-[48px] flex flex-col items-center gap-2 sm:mt-[80px] lg:gap-4">
        <Button
          href="/addteam"
          size="w-[186px] h-[48px] rounded-xl"
        >
          팀 생성하기
        </Button>
        <Button
          href="/invitation"
          size="w-[186px] h-[48px] rounded-xl"
          classname="bg-transparent border border-primary !text-primary hover:border-i-pressed hover:bg-i-inactive hover:bg-opacity-15 active:border-i-pressed active:bg-i-inactive active:bg-opacity-10"
        >
          팀 참여하기
        </Button>
      </div>
    </div>
  );
}
