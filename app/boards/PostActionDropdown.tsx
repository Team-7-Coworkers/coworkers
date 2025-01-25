'use client';

import { useState } from 'react';
import Dropdown from '@/app/components/Dropdown';
import Image from 'next/image';
import kebab from '@/public/images/icons/ic_kebab.svg';

interface PostActionDropdownProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function PostActionDropdown({
  onEdit,
  onDelete,
}: PostActionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dropdown onClose={handleClose}>
      <Dropdown.Button onClick={handleToggle}>
        <Image
          src={kebab}
          alt=""
        />
      </Dropdown.Button>

      <Dropdown.Menu
        isOpen={isOpen}
        animationType="scale"
      >
        <Dropdown.MenuItem onClick={onEdit}>수정하기</Dropdown.MenuItem>
        <Dropdown.MenuItem onClick={onDelete}>삭제하기</Dropdown.MenuItem>
      </Dropdown.Menu>
    </Dropdown>
  );
}
