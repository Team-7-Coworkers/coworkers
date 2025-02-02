'use client';

import TextField from '@/app/components/TextField';
import Button from '@/app/components/Button';
import { useState } from 'react';

export default function Comment() {
  const [comment, setComment] = useState('');

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
        >
          등록
        </Button>
      </div>
    </div>
  );
}
