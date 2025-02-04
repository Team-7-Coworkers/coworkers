'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/Button';
import ImageUpload from '@/app/components/ImageUpload';
import InputField from '@/app/components/InputField';
import TextField from '@/app/components/TextField';
import { postArticles } from '@/app/api/article.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function Write() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const handleUploadSuccess = (uploadedImageUrl: string) => {
    setImage(uploadedImageUrl);
  };

  const handleUploadError = () => {};

  const postArticleMutation = useMutation({
    mutationFn: postArticles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      router.push('/boards');
    },
  });

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    postArticleMutation.mutate({
      title,
      content,
      //이미지 없이 등록할 경우 임시 주소 전송
      image: image || 'https://no-image/no-image.png',
    });
  };

  return (
    <div className="relative mx-auto flex w-[90%] flex-col items-start pb-12 sm:w-[90%] lg:w-[65%]">
      <div className="flex w-full items-center justify-between border-b border-gray-700 pb-8 pt-12">
        <p className="pb-6 text-[20px] font-bold">게시글 쓰기</p>
        <Button
          styleType="solid"
          size="w-[184px] h-[42px]"
          classname="hidden sm:inline-block"
          onClick={handleSubmit}
        >
          등록
        </Button>
      </div>

      <p className="pb-4 pt-10">
        <span className="text-tertiary">*</span>제목
      </p>
      <InputField
        id="title"
        type="text"
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <p className="pb-4 pt-8">
        <span className="text-tertiary">*</span>내용
      </p>
      <TextField
        type="box"
        placeholder="내용을 입력해주세요."
        height={240}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <p className="pb-4 pt-8">
        <span className="text-tertiary">*</span>이미지
      </p>
      <ImageUpload
        onUploadSuccess={handleUploadSuccess}
        onUploadError={handleUploadError}
        variant="square"
      />

      {/*모바일버전버튼 */}
      <Button
        styleType="solid"
        size="w-full h-[42px]"
        classname="sm:hidden mt-10"
        onClick={handleSubmit}
      >
        등록
      </Button>
    </div>
  );
}
