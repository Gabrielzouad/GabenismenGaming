'use client';
import { format } from 'date-fns';

export default function DateComponent({ dateString }) {
  return (
    <time dateTime={dateString} classname='text-white'>
      {format(new Date(dateString), 'LLLL	d, yyyy')}
    </time>
  );
}
