'use client';

import Button from '@/app/components/Button';

import ImageUpload from '@/app/components/ImageUpload';
import InputField from '@/app/components/InputField';
import TextField from '@/app/components/TextField';

export default function write() {
  const handleUploadSuccess = () => {
    console.log('이미지 업로드 성공');
  };

  const handleUploadError = () => {
    console.log('이미지 업로드 실패');
  };

  return (
    <div className="mx-auto flex w-[90%] flex-col items-start pb-12 sm:w-[90%] lg:w-[65%]">
      <div className="flex w-full items-center justify-between border-b border-gray-700 pb-8 pt-12">
        <p className="pb-6 text-[20px] font-bold">게시글 쓰기</p>
        <Button
          styleType="solid"
          size="w-[184px] h-[42px]"
        >
          등록
        </Button>
      </div>

      <p className="pb-4 pt-10">
        <span className="text-tertiary">*</span>제목
      </p>
      <InputField
        id={''}
        type={'text'}
        placeholder={'제목을 입력해주세요.'}
      />
      <p className="pb-4 pt-8">
        <span className="text-tertiary">*</span>내용
      </p>
      <TextField
        type="box"
        placeholder="내용을 입력해주세요."
        height={240}
        value={''}
      />
      <p className="pb-4 pt-8">
        <span className="text-tertiary">*</span>이미지
      </p>
      <ImageUpload
        onUploadSuccess={handleUploadSuccess}
        onUploadError={handleUploadError}
        variant="square"
      />
    </div>
  );
}
