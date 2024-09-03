// app/avatar.tsx
import Image from 'next/image';

export default function Avatar({ name, picture }) {
  return (
    <div className='flex items-center'>
      <div className='relative w-12 h-12 mr-4'>
        <Image
          src={picture.url}
          layout='fill'
          className='rounded-full'
          alt={name}
          objectFit='cover' // Ensures the image covers the div without distortion
        />
      </div>
      <div className='text-xl text-white font-bold'>{name}</div>
    </div>
  );
}
