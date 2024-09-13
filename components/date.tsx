'use client';
import { format } from 'date-fns';

export default function DateComponent({ dateString }) {
  return (
    <time dateTime={dateString} className='text-white'>
      {format(new Date(dateString), 'LLLL	d, yyyy')}
    </time>
  );
}
