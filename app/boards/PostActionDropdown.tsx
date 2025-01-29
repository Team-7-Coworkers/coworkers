'use client';

import Dropdown from '@/app/components/Dropdown';
import Image from 'next/image';
import kebab from '@/public/images/icons/ic_kebab.svg';
import { deleteArticles } from '@/app/api/article.api';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface PostActionDropdownProps {
  onEdit: () => void;
  onDeleteSuccess?: () => void;
  articleId: number;
}

export default function PostActionDropdown({
  onEdit,
  onDeleteSuccess,
  articleId,
}: PostActionDropdownProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      await deleteArticles({ articleId });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      onDeleteSuccess?.();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dropdown>
      <Dropdown.Button>
        <Image
          src={kebab}
          alt=""
          className="h-auto w-6"
        />
      </Dropdown.Button>
      <Dropdown.Menu
        animationType="scale"
        className="absolute right-0 sm:left-0 sm:right-auto"
      >
        <Dropdown.MenuItem onClick={onEdit}>수정하기</Dropdown.MenuItem>
        <Dropdown.MenuItem onClick={handleDelete}>
          {isDeleting ? '삭제 중...' : '삭제하기'}
        </Dropdown.MenuItem>
      </Dropdown.Menu>
    </Dropdown>
  );
}
