'use client';
import { Badge } from 'lucide-react';
import { MatchCard } from '../../components/matchCards/MatchCard';
import { fetchTeamMatches } from '@/api/gamerapi';

import { useEffect, useState } from 'react';

export default function CounterStrikeMatches() {
  const [matches, setMatches] = useState<any[]>([]);
  const competition = matches[0]?.competition;

  useEffect(() => {
    fetchTeamMatches().then((data) => setMatches(data));
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='flex items-center justify-center gap-4 mb-4'>
            {competition?.game?.logo && (
              <img
                src={competition.game.logo.url || '/placeholder.svg'}
                alt={competition.game.title}
                className='w-16 h-16 rounded-lg'
              />
            )}
            <div>
              <h1 className='text-4xl font-bold text-white mb-2'>
                {competition?.game?.title || 'Counter-Strike 2'}
              </h1>
              <Badge className='text-lg px-4 py-1'>
                {competition?.game?.acronym || 'CS2'}
              </Badge>
            </div>
          </div>
          <h2 className='text-2xl text-slate-300 mb-2'>
            {competition?.name || 'Tournament Matches'}
          </h2>
          <p className='text-slate-400'>
            {matches[0]?.division?.name || 'Division Matches'}
          </p>
        </div>

        {/* Matches Grid */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>

        {/* Tournament Info */}
        <div className='mt-12 text-center'>
          <div className='bg-slate-800/50 rounded-lg p-6 backdrop-blur-sm border border-slate-700'>
            <h3 className='text-xl font-semibold text-white mb-2'>
              Tournament Information
            </h3>
            <p className='text-slate-300 mb-2'>
              <span className='font-medium'>Competition:</span>{' '}
              {competition?.name}
            </p>
            <p className='text-slate-300 mb-2'>
              <span className='font-medium'>Division:</span>{' '}
              {matches[0]?.division?.name}
            </p>
            <p className='text-slate-300'>
              <span className='font-medium'>Format:</span> {matches[0]?.bracket}{' '}
              stage
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
