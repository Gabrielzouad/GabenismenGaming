import { Card, CardContent } from '../ui/card';
import { FaTwitter, FaTwitch, FaInstagram } from 'react-icons/fa';

export interface Player {
  name: string;
  role: string;
  avatar: string;
  ign: string;
  socialMedia: {
    twitter: string;
    twitch: string;
    instagram: string;
  };
}

export function PlayerCard({ player }: { player: Player }) {
  return (
    <Card className='bg-gray-800 border-gray-700 overflow-hidden transition-all duration-300 hover:scale-105'>
      <CardContent className='p-0'>
        <img
          src={player.avatar}
          alt={player.name}
          className='w-full h-64 object-cover'
        />
        <div className='p-4'>
          <h3 className='text-xl font-bold text-white'>{player.ign}</h3>
          <p className='text-gray-400'>{player.role}</p>
          <div className='flex space-x-3 mt-2'>
            <a
              href={player.socialMedia.twitter}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-400 hover:text-blue-300'
            >
              <FaTwitter
                size={20}
                className='grayscale hover:grayscale-0 transition'
              />
              <span className='sr-only'>Twitter</span>
            </a>
            <a
              href={player.socialMedia.twitch}
              target='_blank'
              rel='noopener noreferrer'
              className='text-purple-400 hover:text-purple-300'
            >
              <FaTwitch
                size={20}
                className='grayscale hover:grayscale-0 transition'
              />
              <span className='sr-only'>Twitch</span>
            </a>
            <a
              href={player.socialMedia.instagram}
              target='_blank'
              rel='noopener noreferrer'
              className='text-pink-400 hover:text-pink-300'
            >
              <FaInstagram
                size={20}
                className='grayscale hover:grayscale-0 transition'
              />
              <span className='sr-only'>Instagram</span>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
