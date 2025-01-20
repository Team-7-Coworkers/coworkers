import Image from 'next/image';

export default function GNB() {
  return (
    <nav>
      <div className='w-[102px] h-[20px] xl:w-[158px] xl:h-[60px] relative'>
        <Image
          src='/images/logos/logo.svg'
          alt='Logo'
          layout='fill'
          objectFit='contain'
        />
      </div>
    </nav>
  );
}
