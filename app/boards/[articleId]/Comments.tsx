'use client';

import TextField from '@/app/components/TextField';
import Button from '@/app/components/Button';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import {
  getArticlesComment,
  postArticlesComments,
} from '@/app/api/articleComment.api';
import dayjs from 'dayjs';
import Image from 'next/image';
import profile from '@/public/images/icons/ic-member.svg';
import useUserStore from '@/app/stores/userStore';
import PostActionDropdown from '@/app/boards/PostActionDropdown';

export default function Comment() {
  const [comment, setComment] = useState('');
  const { articleId } = useParams();
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  const { data: comments, isLoading: isQueryLoading } = useQuery({
    queryKey: ['articleComments', Number(articleId)],
    queryFn: async () => {
      const data = await getArticlesComment({
        articleId: Number(articleId),
        limit: 10,
      });
      if ('message' in data) return null;
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      if (!comment.trim()) return;
      await postArticlesComments({
        articleId: Number(articleId),
        content: comment,
      });
      setComment('');
      if (articleId) {
        queryClient.invalidateQueries({
          queryKey: ['articleComments', Number(articleId)],
        });
      }
    },
  });

  if (isQueryLoading) return <p>로딩 중...</p>;
  if (!comments) return;

  return (
    <div className="pt-20">
      <p className="pb-6 text-[20px] font-bold">댓글달기</p>
      <TextField
        type="box"
        value={comment}
        placeholder="댓글을 입력해주세요."
        onChange={(e) => setComment(e.target.value)}
        height={100}
      />
      <div className="pb-4" />
      <div className="flex justify-end">
        <Button
          styleType="solid"
          size="w-[184px] h-[42px]"
          onClick={() => mutation.mutate()}
          disabled={mutation.status === 'pending'}
        >
          {mutation.status === 'pending' ? '등록 중...' : '등록'}
        </Button>
      </div>
      <div className="pt-20">
        {comments.list.length > 0 ? (
          comments.list.map((comment) => (
            <div
              key={comment.id}
              className="mb-4 rounded-md bg-b-secondary px-6 py-5"
            >
              <p>{comment.content}</p>
              {user?.id === comment.writer.id && (
                <PostActionDropdown
                  onEdit={() => console.log(`수정: ${comment.id}`)}
                  onDeleteSuccess={() =>
                    console.log(`삭제 완료: ${comment.id}`)
                  }
                  articleId={comment.id}
                />
              )}
              <div className="mt-[30px] flex items-center">
                {(() => {
                  if (
                    comment.writer.image &&
                    comment.writer.image.startsWith('http')
                  ) {
                    return (
                      <Image
                        src={comment.writer.image}
                        alt="프로필"
                        className="h-[32px] w-[32px] rounded-full"
                      />
                    );
                  } else {
                    return (
                      <Image
                        src={profile}
                        alt="기본 프로필"
                      />
                    );
                  }
                })()}
                <p className="border-r border-gray-700 px-3 text-[14px]">
                  {comment.writer.nickname}
                </p>
                <p className="pl-3 text-[14px] text-i-inactive">
                  {dayjs(comment.createdAt).format('YYYY.MM.DD')}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>댓글이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
