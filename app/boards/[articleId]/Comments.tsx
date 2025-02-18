'use client';

import TextField from '@/app/components/TextField';
import Button from '@/app/components/Button';
import { useState, useRef, useCallback } from 'react';
import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import {
  getArticlesComment,
  postArticlesComments,
  patchComments,
} from '@/app/api/articleComment.api';
import dayjs from 'dayjs';

import profile from '@/public/images/icons/icon-base-user.svg';
import useUserStore from '@/app/stores/userStore';
import PostActionDropdown from '@/app/boards/PostActionDropdown';
import { ArticleCommentType } from '@/app/types/articleComment';
import Loading from '@/app/components/Loading';
import { MAX_LENGTH } from '@constants/form';
import { toast } from 'react-toastify';
import Img from '@components/Img';

export default function Comment() {
  const [comment, setComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState('');
  const { articleId } = useParams();
  const queryClient = useQueryClient();
  const { user } = useUserStore();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['articleComments', Number(articleId)],
    queryFn: async ({ pageParam }: { pageParam?: number }) => {
      const data = await getArticlesComment({
        articleId: Number(articleId),
        limit: 10,
        cursor: pageParam,
      });

      if ('message' in data) {
        toast.error(data.message || '댓글을 불러오는 중 문제가 발생했습니다.');
        return null;
      }

      return data;
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.nextCursor || undefined,
  });

  // 마지막 댓글이 화면에 보여지는 걸 감지
  const lastCommentRef = useCallback(
    (node: HTMLDivElement) => {
      //중복 요청 방지
      if (isFetchingNextPage) return;
      //중복 감지 방지
      if (observerRef.current) observerRef.current.disconnect();

      // 마지막 댓글이 화면에 나타났고 다음 페이지가 있다면 실행
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  const mutation = useMutation({
    mutationFn: async () => {
      if (!comment.trim()) return;
      await postArticlesComments({
        articleId: Number(articleId),
        content: comment,
      });
      setComment('');
      toast.success('등록이 완료되었습니다.');
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
      toast.success('수정이 완료되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['articleComments', Number(articleId)],
      });
    },
  });

  if (!comments) return;

  return (
    <div className="pb-20 pt-20">
      {user && (
        <div>
          <p className="pb-6 text-[20px] font-bold">댓글달기</p>
          <TextField
            type="box"
            value={comment}
            placeholder="댓글을 입력해주세요."
            onChange={(e) => {
              if (e.target.value.length > 300) {
                toast.error(
                  `댓글은 최대 ${MAX_LENGTH.articleComment}자까지 입력 가능합니다.`
                );
                return;
              }
              setComment(e.target.value);
            }}
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
        </div>
      )}
      <div className="pt-20">
        {comments?.pages
          .flatMap((page) => page?.list || [])
          .map((comment: ArticleCommentType, index, array) => (
            <div
              key={comment.id}
              className="mb-6 rounded-md bg-b-secondary px-6 py-5"
              ref={index === array.length - 1 ? lastCommentRef : undefined} //마지막 댓글 감지지
            >
              <div className="flex flex-col">
                {editingCommentId === comment.id ? (
                  <>
                    <TextField
                      type="box"
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      height={130}
                    />
                    <div className="mt-5 flex justify-end">
                      <Button
                        styleType="solid"
                        size="X-small"
                        onClick={() => editMutation.mutate(comment.id)}
                        disabled={editMutation.status === 'pending'}
                      >
                        {editMutation.status === 'pending'
                          ? '수정 중...'
                          : '완료'}
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between">
                    <p className="break-all">{comment.content}</p>
                    {user?.id === comment.writer.id && (
                      <PostActionDropdown
                        onEdit={() => {
                          setEditingCommentId(comment.id);
                          setEditedContent(comment.content);
                        }}
                        onDeleteSuccess={() => {}}
                        commentId={comment.id}
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="mt-3 flex items-center">
                <Img
                  src={
                    comment.writer.image?.startsWith('http')
                      ? comment.writer.image
                      : profile
                  }
                  alt="프로필"
                  width={32}
                  height={32}
                  className="h-[32px] w-[32px] rounded-full border-[2px] border-gray-200/10 bg-b-secondary object-cover"
                />

                <p className="border-r border-gray-700 px-3 text-[14px]">
                  {comment.writer.nickname}
                </p>

                {/* 🔥 createdAt과 updatedAt이 다르면 (수정) 표시 */}
                <p className="pl-3 text-[14px] text-i-inactive">
                  {dayjs(comment.updatedAt).format('YYYY.MM.DD')}
                  {comment.createdAt !== comment.updatedAt && ' (수정)'}
                </p>
              </div>
            </div>
          ))}

        {comments?.pages.flatMap((page) => page?.list || []).length === 0 && (
          <div className="flex justify-center">
            <p className="text-center text-t-default">
              아직 작성된 댓글이 없습니다.
            </p>
          </div>
        )}

        {isFetchingNextPage && <Loading />}
      </div>
    </div>
  );
}
