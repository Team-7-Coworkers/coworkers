'use client';

import React from 'react';
import Button from '../components/Button';

export default function ButtonTest() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-4">
      {/* Solid - Default */}
      <Button
        text="Solid Default"
        styleType="solid"
        state="default"
        onClick={handleClick}
      />

      <Button
        text="Solid Default"
        styleType="solid"
        state="floating"
        onClick={handleClick}
      />

      {/* Solid - Danger */}
      <Button
        text="Danger"
        styleType="solid"
        state="danger"
        onClick={handleClick}
      />

      {/* Outlined - Default */}
      <Button
        text="Outlined Default"
        styleType="outlined"
        state="default"
        onClick={handleClick}
      />

      {/* Outlined Secondary */}
      <Button
        text="Outlined Secondary"
        styleType="outlined-secondary"
        state="default"
        onClick={handleClick}
      />

      {/* Disabled - Solid */}
      <Button
        text="Disabled Solid"
        styleType="solid"
        state="default"
        disabled={true}
      />

      {/* Disabled - Outlined */}
      <Button
        text="Disabled Outlined"
        styleType="outlined"
        state="default"
        disabled={true}
      />

      {/* X-Small - Solid */}
      <Button
        text="생성하기"
        styleType="solid"
        state="default"
        size="X-small"
        onClick={handleClick}
      />

      {/* 임의 크기 */}
      <Button
        text="임의"
        styleType="solid"
        state="default"
        size="w-[200px]"
        onClick={handleClick}
      />
    </div>
  );
}
