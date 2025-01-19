'use client';

import React from 'react';
import Button from '../components/Button';

export default function ButtonTest() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-4">
      {/* Solid - Default */}
      <Button
        text="Solid Default"
        styleType="solid"
        state="default"
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
    </main>
  );
}
