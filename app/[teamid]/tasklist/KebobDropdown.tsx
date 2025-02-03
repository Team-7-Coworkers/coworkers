'use client';

import Image from 'next/image';
import Dropdown from '@/app/components/Dropdown';

interface DropdownMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function KebobDropdown({ onEdit, onDelete }: DropdownMenuProps) {
  return (
    <Dropdown className="relative flex items-center">
      <Dropdown.Button>
        <Image
          src="/images/icons/ic_kebab.svg"
          alt="수정, 삭제"
          width={16}
          height={16}
          className="cursor-pointer rounded-full hover:bg-b-primary"
        />
      </Dropdown.Button>
      <Dropdown.Menu
        animationType="scale"
        className="-right-3"
      >
        <Dropdown.MenuItem onClick={onEdit}>수정하기</Dropdown.MenuItem>
        <Dropdown.MenuItem onClick={onDelete}>삭제하기</Dropdown.MenuItem>
      </Dropdown.Menu>
    </Dropdown>
  );
}
