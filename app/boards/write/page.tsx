'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/app/components/Button';
import ImageUpload from '@/app/components/ImageUpload';
import TextField from '@/app/components/TextField';
import {
  postArticles,
  patchArticles,
  getDetailsArticle,
} from '@/app/api/article.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function Write() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const articleId = searchParams.get('articleId');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  //수정하기로 들어갔을 때 게시글 정보 가져옴
  useEffect(() => {
    if (articleId) {
      getDetailsArticle({ articleId: Number(articleId) })
        .then((data) => {
          if ('title' in data && 'content' in data && 'image' in data) {
            setTitle(data.title);
            setContent(data.content);
            setImage(data.image);
          }
        })
        .catch(() => {});
    }
  }, [articleId]);

  const postMutation = useMutation({
    mutationFn: postArticles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      router.push('/boards');
    },
  });

  const patchMutation = useMutation({
    mutationFn: patchArticles,
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

    if (articleId) {
      //수정정
      patchMutation.mutate({
        articleId: Number(articleId),
        title,
        content,
        image: image || 'https://no-image/no-image.png',
      });
    } else {
      //등록
      postMutation.mutate({
        title,
        content,
        //이미지 없이 등록할 경우 임시 주소 전송
        image: image || 'https://no-image/no-image.png',
      });
    }
  };

  return (
    <div className="relative mx-auto flex w-[90%] flex-col items-start pb-12 sm:w-[90%] lg:w-[65%]">
      <div className="flex w-full items-center justify-between border-b border-gray-700 pb-8 pt-12">
        <p className="pb-6 text-[20px] font-bold">
          {articleId ? '게시글 수정' : '게시글 쓰기'}
        </p>
        <Button
          styleType="solid"
          size="w-[184px] h-[42px]"
          classname="hidden sm:inline-block"
          onClick={handleSubmit}
        >
          {articleId ? '수정' : '등록'}
        </Button>
      </div>

      <p className="pb-4 pt-10">
        <span className="text-tertiary">*</span>제목
      </p>
      <input
        id="title"
        type="text"
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border-1px w-full rounded-[12px] border border-[#F8FAFC1A] bg-b-secondary py-[8px] pl-[16px] text-md font-normal text-t-primary placeholder-[#9CA3AF] focus:border-bd-primary focus:outline-none sm:py-[16px] sm:pl-[24px] sm:text-lg"
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
        <span className="text-[14px] text-t-default"> (선택)</span>
      </p>
      <ImageUpload
        url={image !== 'https://no-image/no-image.png' ? image : undefined}
        onUploadSuccess={setImage}
        onUploadError={() => {}}
        variant="square"
      />

      {/*모바일버전버튼 */}
      <Button
        styleType="solid"
        size="w-full h-[42px]"
        classname="sm:hidden mt-10"
        onClick={handleSubmit}
      >
        {articleId ? '수정' : '등록'}
      </Button>
    </div>
  );
}
