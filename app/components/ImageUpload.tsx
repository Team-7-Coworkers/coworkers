'use client';

import Image from 'next/image';
import ImageUpload from '@/app/components/icons/ImageUpload.svg';
import ImagePreview from '@/app/components/icons/image.svg';
import Plus from '@/app/components/icons/ic_plus.svg';
import React, { useRef, useState } from 'react';
import { postImagesUpload } from '@/app/api/image.api';

interface FileUploadProps {
  onUploadSuccess: (url: string) => void; // 업로드 성공 시 실행할 함수
  onUploadError: (error: Error) => void; // 업로드 실패 시 실행할 함수
  variant?: 'circle' | 'square'; // 'circle': 프로필/팀 이미지, 'square': 게시글 이미지
}

function FileUpload({
  onUploadSuccess,
  onUploadError,
  variant = 'circle',
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const response = await postImagesUpload({ imageFile: file });
      setPreviewUrl(response.url);
      onUploadSuccess(response.url);
    } catch (error) {
      onUploadError(error as Error);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* 숨겨진 파일 입력 */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* 이미지 미리보기 및 업로드 아이콘 */}
      {variant === 'circle' ? (
        // Circle 영역 (프로필/팀 이미지)
        <div className="relative flex h-16 w-16 items-center justify-center">
          {/* ImagePreview 아이콘 */}
          <Image
            src={ImagePreview}
            alt="이미지 미리보기"
            layout="fill"
            objectFit="contain"
            className="pointer-events-none rounded-full"
          />
          {/* 업로드된 이미지 미리보기 */}
          {previewUrl && (
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <Image
                src={previewUrl}
                alt="업로드된 이미지 미리보기"
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
          <div
            className="hover:text-blue-500 absolute bottom-0 right-0 cursor-pointer"
            onClick={triggerFileInput}
          >
            <Image
              src={ImageUpload}
              alt="이미지 업로드"
              width={18}
              height={18}
              className="cursor-pointer"
            />
          </div>
        </div>
      ) : (
        // Square 영역
        <div
          className="relative flex h-[240px] w-[240px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-gray-100/10"
          onClick={triggerFileInput}
        >
          {!previewUrl ? (
            <>
              <Image
                src={Plus}
                alt="플러스 아이콘"
                width={48}
                height={48}
                className="mb-4"
              />
              <div className="font-normal leading-[19px] text-gray-400">
                이미지 등록
              </div>
            </>
          ) : (
            <Image
              src={previewUrl}
              alt="업로드된 이미지 미리보기"
              layout="fill"
              objectFit="cover"
              className="absolute inset-0"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default FileUpload;
