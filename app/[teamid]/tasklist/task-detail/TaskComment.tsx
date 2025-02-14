'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getTaskComments,
  postTasksComments,
  patchTasksComments,
  deleteTasksComments,
} from '@/app/api/taskComment.api';
import { TaskCommentType } from '@/app/types/taskComment';
import SubmitIcon from '../task-icon/SubmitIcon';
import TextField from '@/app/components/TextField';
import { useTaskStore } from '@/app/stores/taskStore';
import UserProfile from './UserProfile';
import KebobDropdown from '../KebobDropdown';
import Button from '@/app/components/Button';
import { formatCommentDate } from '@/app/utils/date';
import useUserStore from '@/app/stores/userStore';
import { MAX_LENGTH } from '@/app/constants/form';

interface TaskCommentProps {
  taskListId: number;
  taskId: number;
}

export default function TaskComment({ taskListId, taskId }: TaskCommentProps) {
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');

  const { user } = useUserStore();
  const updateCommentCount = useTaskStore((state) => state.updateCommentCount);

  const { data: comments = [] } = useQuery<TaskCommentType[]>({
    // 댓글 가져오기
    queryKey: ['taskComments', taskId],
    queryFn: async () => {
      const data = await getTaskComments({ taskId });
      updateCommentCount(taskListId, taskId, data.length);
      return Array.isArray(data) ? data : [];
    },
    staleTime: 1000 * 60 * 5,
  });

  const postCommentMutation = useMutation({
    // 댓글 보내기
    mutationFn: async () => {
      if (!newComment.trim()) return;
      await postTasksComments({ taskId, content: newComment });
      setNewComment('');
      queryClient.invalidateQueries({ queryKey: ['taskComments', taskId] });
    },
  });

  const patchCommentMutation = useMutation({
    // 댓글 수정하기
    mutationFn: async (commentId: number) => {
      if (!editingContent.trim()) return;
      await patchTasksComments({ taskId, commentId, content: editingContent });
      setEditingCommentId(null);
      setEditingContent('');
      queryClient.invalidateQueries({ queryKey: ['taskComments', taskId] });
    },
  });

  const deleteCommentMutation = useMutation({
    // 댓글 삭제하기
    mutationFn: async (commentId: number) => {
      await deleteTasksComments({ taskId, commentId });
      queryClient.invalidateQueries({ queryKey: ['taskComments', taskId] });
    },
  });

  const isAuthor = (commentUserId: number) => user?.id === commentUserId; // 아이디가 댓글을 단 아이디와 같은 지 판별

  const handleAddComment = () => {
    postCommentMutation.mutate();
  };

  const handleEditComment = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setEditingContent(content);
  };

  const handleSaveEdit = (commentId: number) => {
    patchCommentMutation.mutate(commentId);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingContent('');
  };

  const handleDeleteComment = (commentId: number) => {
    deleteCommentMutation.mutate(commentId);
  };

  return (
    <div className="mt-4">
      {/* 댓글 달기 인풋 */}
      <div className="mb-1 flex min-h-12 items-center gap-2 border-b border-t border-b-bd-primary/10 border-t-bd-primary/10 py-2">
        <TextField
          type="reply"
          value={newComment}
          placeholder="댓글을 달아주세요"
          onChange={(e) => setNewComment(e.target.value)}
          maxlength={MAX_LENGTH.taskComment}
          enterSubmit
          className="!text-md"
          onSubmit={handleAddComment}
        />
        <button
          onClick={handleAddComment}
          className={newComment.trim() ? 'text-primary' : 'text-ic-primary'}
        >
          <SubmitIcon />
        </button>
      </div>
      <div className="pb-16 sm:pb-20">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="flex min-w-0 items-center justify-between border-b border-b-bd-primary/10 pb-3"
            >
              {/* 댓글이 수정중이라면 */}
              {editingCommentId === comment.id ? (
                <div className="mt-3 flex-1">
                  <TextField
                    type="reply"
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    maxlength={MAX_LENGTH.taskComment}
                    className="!text-md"
                  />
                  <div className="mt-4 flex items-center justify-end gap-2">
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-1 text-sm text-t-default hover:text-t-tertiary"
                    >
                      취소
                    </button>
                    <Button
                      onClick={() => handleSaveEdit(comment.id)}
                      size="w-[74px] h-8 rounded-xl"
                      classname="bg-transparent border border-primary text-md !text-primary hover:border-i-pressed hover:bg-i-inactive hover:bg-opacity-15 active:border-i-pressed active:bg-i-inactive active:bg-opacity-10"
                    >
                      수정하기
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="relative mt-3 max-w-full flex-1 text-md">
                  {/* 댓글 정보 보여주기 */}
                  <p className="w-[calc(100%-20px)] whitespace-pre-wrap break-words text-t-primary">
                    {comment.content}
                  </p>
                  {isAuthor(comment.user.id) && (
                    <div className="absolute right-0 top-0 ml-3">
                      <KebobDropdown
                        onEdit={() =>
                          handleEditComment(comment.id, comment.content)
                        }
                        onDelete={() => handleDeleteComment(comment.id)}
                      />
                    </div>
                  )}
                  <div className="mt-5 flex items-center justify-between text-t-secondary">
                    <UserProfile
                      image={comment.user.image}
                      nickname={comment.user.nickname}
                    />
                    <span>{formatCommentDate(comment.createdAt)}</span>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="mt-24 text-center text-t-default">
            아직 작성된 댓글이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
