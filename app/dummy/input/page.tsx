'use client';

import Button from '@/app/components/Button';
import InputField from '@/app/components/InputField';
import { useState } from 'react';

export default function InputPage() {
  const [errorMessage, setErrorMessage] = useState('');
  return (
    <div className="h-screen w-full">
      <div className="container py-8">
        <h1 className="mb-4 text-2xl font-bold">인풋 테스트 페이지</h1>

        <div className="flex flex-col gap-2">
          <InputField
            id="test"
            type="text"
            placeholder="test"
            errorMessage={errorMessage}
            validator={(value) => (value === '' ? 'blank' : '')}
          />
          <Button onClick={() => setErrorMessage('erro message')}>test</Button>
        </div>
      </div>
    </div>
  );
}
