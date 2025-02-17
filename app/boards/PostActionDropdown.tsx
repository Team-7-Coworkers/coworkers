'use client';

import Dropdown from '@/app/components/Dropdown';
import Image from 'next/image';
import kebab from '@/public/images/icons/ic_kebab.svg';
import { deleteArticles } from '@/app/api/article.api';
import { deleteComments } from '@/app/api/articleComment.api';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface PostActionDropdownProps {
  onEdit: () => void;
  onDeleteSuccess?: () => void;
  articleId?: number;
  commentId?: number;
}

export default function PostActionDropdown({
  onEdit,
  onDeleteSuccess,
  articleId,
  commentId,
}: PostActionDropdownProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleDelete = async () => {
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      if (articleId) {
        await deleteArticles({ articleId });
        queryClient.invalidateQueries({ queryKey: ['articles'] });
        toast.success('삭제가 완료되었습니다.');
      } else if (commentId) {
        await deleteComments({ commentId });
        queryClient.invalidateQueries({ queryKey: ['articleComments'] });
        toast.success('삭제가 완료되었습니다.');
      }
      onDeleteSuccess?.();
    } catch {
      toast.error('삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    if (articleId) {
      router.push(`/boards/write?articleId=${articleId}`);
    } else if (commentId) {
      onEdit();
    }
  };

  return (
    <Dropdown>
      <Dropdown.Button>
        <Image
          src={kebab}
          alt=""
          className="h-6 w-6 max-w-none"
        />
      </Dropdown.Button>
      <Dropdown.Menu
        animationType="scale"
        className="absolute left-auto right-0 lg:left-0 lg:right-auto"
      >
        <Dropdown.MenuItem onClick={handleEdit}>수정하기</Dropdown.MenuItem>
        <Dropdown.MenuItem onClick={handleDelete}>
          {isDeleting ? '삭제 중...' : '삭제하기'}
        </Dropdown.MenuItem>
      </Dropdown.Menu>
    </Dropdown>
  );
}
