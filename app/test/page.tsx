'use client';
import React, { useState } from 'react';
import InputField from '../components/InputField';

const InputTestPage = () => {
  const [value, setValue] = useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">InputField 테스트</h1>
      <div className="w-96">
        <InputField
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          isPassword
          errorMessage={value.length < 8 ? '8자 이상 입력하세요' : ''}
        />
      </div>
    </div>
  );
};

export default InputTestPage;
