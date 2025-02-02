import Image from 'next/image';

export default function EasyLogin({ page }: { page: 'login' | 'signup' }) {
  return (
    <div className="flex justify-between">
      <p className="font-medium">
        간편 {`${page ? `로그인` : '회원가입'}하기`}
      </p>
      <div className="flex gap-4">
        <Image
          src="/images/icons/ic_google.svg"
          alt="구글 간편 로그인"
          width={42}
          height={42}
        />
        <Image
          src="/images/icons/ic_kakaotalk.svg"
          alt="카카오톡 간편 로그인"
          width={42}
          height={42}
        />
      </div>
    </div>
  );
}
