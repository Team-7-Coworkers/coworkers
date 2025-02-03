'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { postImagesUpload } from '@/app/api/image.api';

interface FileUploadProps {
  onUploadSuccess: (url: string) => void; // 업로드 성공 시 실행할 함수
  onUploadError: (error: Error) => void; // 업로드 실패 시 실행할 함수
  variant?: 'circle' | 'square'; // 'circle': 프로필/팀 이미지, 'square': 게시글 이미지
  url?: string; // 초기 이미지 주소
}

function ImageUpload({
  onUploadSuccess,
  onUploadError,
  variant = 'circle',
  url = '',
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const localPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(localPreviewUrl);

    try {
      const response = await postImagesUpload({ imageFile: file });
      setPreviewUrl(response.url);
      onUploadSuccess(response.url);
    } catch (error) {
      // 서버에서 문제가 발생한 경우
      setPreviewUrl(null);
      onUploadError(error as Error);
      alert('서버에서 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      URL.revokeObjectURL(localPreviewUrl);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center">
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
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-gray-200/10 bg-b-secondary">
          {/* ImagePreview 아이콘 */}
          <Image
            src="/images/icons/ic_image.svg"
            alt="이미지 미리보기"
            width={24}
            height={24}
            className="pointer-events-none"
          />
          {/* 업로드된 이미지 미리보기 */}
          {(url || previewUrl) && (
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <Image
                src={previewUrl || url}
                alt="업로드된 이미지 미리보기"
                width={58}
                height={58}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div
            className="absolute bottom-[-1px] right-[-8px] cursor-pointer rounded-full border-[2px] border-b-primary"
            style={{
              borderColor: 'var(--b-primary)',
            }}
            onClick={triggerFileInput}
          >
            {/* 아이콘 애니메이션, hover시 색 변경을 위해  svg를 직접 삽입*/}
            <div className="group transform cursor-pointer transition-transform duration-300 hover:scale-110">
              <svg
                width="20"
                height="20"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
              >
                <circle
                  cx="16"
                  cy="16"
                  r="16"
                  className="fill-b-secondary transition-colors duration-300 group-hover:fill-blue"
                />
                <path
                  d="M16.0228 9.22574C16.2087 8.82492 16.6837 8.65204 17.0837 8.83958L20.527 10.4538C20.927 10.6414 21.1006 11.1183 20.9147 11.5191L16.148 21.7962C16.0575 21.9913 15.8923 22.1415 15.6898 22.2128L13.1851 23.094C12.7755 23.2381 12.3252 23.027 12.1717 22.6189L11.2332 20.1235C11.1573 19.9217 11.1656 19.698 11.2561 19.5028L16.0228 9.22574Z"
                  className="fill-gray-400 transition-colors duration-300"
                />
                <path
                  d="M12.6641 9.56641L22.1995 14.0401"
                  className="stroke-b-secondary transition-colors duration-300 group-hover:stroke-blue"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        // Square 영역
        <div
          className="relative flex h-[160px] w-[160px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-[3px] border-gray-200/10 bg-b-primary"
          onClick={triggerFileInput}
        >
          {!previewUrl && !url ? (
            <>
              <Image
                src="/images/icons/ic_plus.svg"
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
              src={previewUrl || url}
              alt="업로드된 이미지 미리보기"
              width={160}
              height={160}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
