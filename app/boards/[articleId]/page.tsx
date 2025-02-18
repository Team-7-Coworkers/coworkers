'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getDetailsArticle } from '@/app/api/article.api';
import type { DetailedArticleType } from '@/app/types/article';
import commentIcon from '@/public/images/icons/ic_comment.svg';
import Image from 'next/image';
import dayjs from 'dayjs';
import PostActionDropdown from '@/app/boards/PostActionDropdown';
import LikeButton from '@/app/boards/LikeButton';
import useUserStore from '@/app/stores/userStore';
import Comment from './Comments';

import Loading from '@/app/components/Loading';
import { useState } from 'react';
import Img from '@components/Img';
import { toast } from 'react-toastify';

export default function ArticleDetail() {
  const { articleId } = useParams();
  const router = useRouter();
  const { user } = useUserStore();

  const { data: article, isLoading } = useQuery<DetailedArticleType | null>({
    queryKey: ['article', articleId],
    queryFn: async () => {
      const data = await getDetailsArticle({ articleId: Number(articleId) });

      if ('message' in data) {
        toast.error(
          data.message || '게시글을 불러오는 중 문제가 발생했습니다.'
        );
        return null;
      }
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const handleDeleteSuccess = () => {
    router.push('/boards');
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loading classname="" />
      </div>
    );

  if (!article) return null;

  return (
    <div className="mx-auto mt-14 flex w-[90%] flex-col sm:w-[90%] lg:w-[65%]">
      <div className="flex w-full justify-between border-b border-gray-700 pb-4">
        <div className="flex w-full justify-between">
          <p className="flex-grow break-all text-[18px] font-medium text-t-secondary">
            {article.title}
          </p>

          {article.image && (
            <div
              className="relative ml-auto h-[150px] w-[150px] flex-shrink-0 cursor-pointer overflow-hidden rounded-[8px]"
              onClick={() => openImageModal(article.image)}
            >
              <Img
                src={article.image}
                alt={article.title}
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>

        {user?.nickname === article.writer.nickname && (
          <PostActionDropdown
            onEdit={() => {}}
            onDeleteSuccess={handleDeleteSuccess}
            articleId={article.id}
          />
        )}
      </div>

      <div className="mt-4 flex w-full items-center justify-between text-[14px]">
        <div className="flex items-center space-x-2">
          <p className="pr-3">{article.writer.nickname}</p>
          <span className="h-4 border-l border-gray-700"></span>

          <p className="text-t-secondary">
            {dayjs(article.updatedAt).format('YYYY.MM.DD')}
            {article.createdAt !== article.updatedAt && ' (수정)'}
          </p>
        </div>

        <div className="flex space-x-4">
          <p className="mr-1 flex items-center space-x-1">
            <Image
              src={commentIcon}
              alt="댓글 아이콘"
            />
            <span className="text-t-disabled">{article.commentCount}</span>
          </p>

          <LikeButton
            articleId={article.id}
            initialLikeCount={article.likeCount}
            initialIsLiked={article.isLiked ?? false}
          />
        </div>
      </div>

      <p className="mt-4 w-full break-all text-left text-t-secondary">
        {article.content}
      </p>
      <Comment />
      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeImageModal}
        >
          <div className="relative w-auto max-w-4xl">
            <div className="relative h-[600px] max-h-[70vh] w-[800px] max-w-[70vw]">
              <Image
                src={selectedImage}
                alt="게시글 이미지"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
