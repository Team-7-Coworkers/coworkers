import Image from 'next/image';
import Loading from '../components/Loading';

interface EasyLoginLoadingPageProps {
  type: 'kakao' | 'google';
}

const loginType = {
  kakao: { name: '카카오톡', src: '/images/icons/ic_kakaotalk.svg' },
  google: { name: '구글', src: '/images/icons/ic_google.svg' },
};

export default function EasyLoginLoadingPage({
  type,
}: EasyLoginLoadingPageProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 py-40 sm:gap-6">
      <div className="space-y-4 text-center sm:space-y-6">
        <div className="flex items-center gap-2">
          <div className="relative h-10 w-10">
            <Image
              src={loginType[type].src}
              alt=""
              width={32}
              height={32}
              className="sm:h-10 sm:w-10"
            />
          </div>
          <p className="text-2xl font-semibold sm:text-3xl">
            {`${loginType[type].name} 간편 로그인`}
          </p>
        </div>
        <div className="space-y-1 text-xs sm:text-md">
          <p>처리중입니다. 잠시만 기다려주세요...</p>
        </div>
      </div>
      <Loading />
    </div>
  );
}
