'use client';

import { useState } from 'react';
import AddButton from './AddButton';
import ListCategory from './ListCategory';
import ListHeader from './ListHeader';

export default function ListPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  return (
    <div className="container relative min-h-[700px]">
      <h1 className="mb-10 mt-8 text-2lg font-bold text-t-primary sm:text-xl">
        할 일
      </h1>
      <ListHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <div className="mt-5 sm:mt-6 lg:mt-8">
        <ListCategory selectedDate={selectedDate} />
      </div>
      <AddButton />
    </div>
  );
}
