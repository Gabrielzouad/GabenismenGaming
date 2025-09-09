import { ArrowLeft, Trophy, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

import { Badge } from '../ui/badge';
interface MatchHeaderProps {
  matchId: string;
}

export function MatchHeader({ matchId }: MatchHeaderProps) {
  return (
    <div className='mb-8'>
      {/* Back Button */}
      <div className='mb-6'>
        <Link href='/kamper'>
          <Button
            variant='ghost'
            className='text-slate-300 hover:text-white hover:bg-slate-700'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Matches
          </Button>
        </Link>
      </div>

      {/* Match Info */}
      <div className='text-center'>
        <div className='flex items-center justify-center gap-4 mb-4'>
          <img
            src='https://i.bo3.no/image/375476/assets_8f89bbd89eb44426a8f4ef29f7d3763c_11e447157ac34bf29525987e7d49b64f.jpg?c=1&h=500&w=500'
            alt='Counter-Strike 2'
            className='w-16 h-16 rounded-lg'
          />
          <div>
            <h1 className='text-4xl font-bold text-white mb-2'>
              Match Statistics
            </h1>
            <Badge variant='secondary' className='text-lg px-4 py-1'>
              CS2
            </Badge>
          </div>
        </div>

        <div className='bg-slate-800/50 rounded-lg p-6 backdrop-blur-sm border border-slate-700 max-w-2xl mx-auto'>
          <div className='flex items-center justify-center gap-6 text-slate-300'>
            <div className='flex items-center gap-2'>
              <Trophy className='w-5 h-5 text-green-400' />
              <span>Match #{matchId}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Calendar className='w-5 h-5' />
              <span>September 9, 2025</span>
            </div>
            <div className='flex items-center gap-2'>
              <Clock className='w-5 h-5' />
              <span>17:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
