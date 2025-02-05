'use client';

import React, { useState } from 'react';
import TextField from '@/app/components/TextField';

export default function DummyComponent() {
  const [comment, setComment] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    alert(`입력된 댓글: ${comment}`);
    setComment('');
  };

  return (
    <>
      <h3 className="mb-4 text-lg font-bold">댓글 입력</h3>
      <TextField
        type="box"
        value={comment}
        placeholder="댓글을 입력하세요..."
        onChange={handleChange}
        enterSubmit
        onSubmit={handleSubmit}
      />
    </>
  );
}
