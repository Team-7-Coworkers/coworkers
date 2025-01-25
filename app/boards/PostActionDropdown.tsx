'use client';

import { useState } from 'react';
import Dropdown from '@/app/components/Dropdown';
import Image from 'next/image';
import kebab from '@/public/images/icons/ic_kebab.svg';
import { deleteArticles } from '@/app/api/article.api';

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
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      await deleteArticles({ articleId });
      if (onDeleteSuccess) onDeleteSuccess();
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  return (
    <Dropdown onClose={handleClose}>
      <Dropdown.Button onClick={handleToggle}>
        <Image
          src={kebab}
          alt=""
          className="h-auto w-6"
        />
      </Dropdown.Button>

      <Dropdown.Menu
        isOpen={isOpen}
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
