'use client';

import TextField from '@/app/components/TextField';
import Button from '@/app/components/Button';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import {
  getArticlesComment,
  postArticlesComments,
  patchComments,
} from '@/app/api/articleComment.api';
import dayjs from 'dayjs';
import Image from 'next/image';
import profile from '@/public/images/icons/ic-member.svg';
import useUserStore from '@/app/stores/userStore';
import PostActionDropdown from '@/app/boards/PostActionDropdown';

export default function Comment() {
  const [comment, setComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState('');
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

  const editMutation = useMutation({
    mutationFn: async (commentId: number) => {
      if (!editedContent.trim()) return;
      await patchComments({ commentId, content: editedContent });
      setEditingCommentId(null);
      queryClient.invalidateQueries({
        queryKey: ['articleComments', Number(articleId)],
      });
    },
  });

  if (isQueryLoading) return <p>로딩 중...</p>;
  if (!comments) return;

  return (
    <div className="pb-20 pt-20">
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
            //게시글 댓글 목록 부분
            <div
              key={comment.id}
              className="mb-6 rounded-md bg-b-secondary px-6 py-5"
            >
              <div className="flex justify-between">
                {editingCommentId === comment.id ? (
                  <TextField
                    type="box"
                    value={editedContent}
                    placeholder="댓글을 수정하세요."
                    onChange={(e) => setEditedContent(e.target.value)}
                    height={100}
                  />
                ) : (
                  <p>{comment.content}</p>
                )}
                {user?.id === comment.writer.id &&
                  editingCommentId !== comment.id && (
                    <PostActionDropdown
                      onEdit={() => {
                        setEditingCommentId(comment.id);
                        setEditedContent(comment.content);
                      }}
                      onDeleteSuccess={() =>
                        console.log(`삭제 완료: ${comment.id}`)
                      }
                      commentId={comment.id}
                    />
                  )}
              </div>
              <div className="mt-[30px] flex items-center">
                {comment.writer.image &&
                comment.writer.image.startsWith('http') ? (
                  <Image
                    src={comment.writer.image}
                    alt="프로필"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <Image
                    src={profile}
                    alt="기본 프로필"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <p className="border-r border-gray-700 px-3 text-[14px]">
                  {comment.writer.nickname}
                </p>
                <p className="pl-3 text-[14px] text-i-inactive">
                  {dayjs(comment.createdAt).format('YYYY.MM.DD')}
                </p>
              </div>
              {editingCommentId === comment.id && (
                <div className="mt-2 flex justify-end">
                  <Button
                    styleType="solid"
                    size="X-small"
                    onClick={() => editMutation.mutate(comment.id)}
                    disabled={editMutation.status === 'pending'}
                  >
                    {editMutation.status === 'pending' ? '수정 중...' : '완료'}
                  </Button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex justify-center">
            <p className="text-center text-t-default">
              아직 작성된 댓글이 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
