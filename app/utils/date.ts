import { DAYS } from '../constants/days';

export const formatDate = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dayOfWeek = DAYS[date.getDay()];
  return `${month}월 ${day}일 (${dayOfWeek})`;
};

export const calculateDate = (date: Date, offset: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + offset);
  return newDate;
};
