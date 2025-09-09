import { Clock, Trophy, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

interface Match {
  id: number;
  start_time: string;
  finished_at: string | null;
  home_score: number | null;
  away_score: number | null;
  round_identifier_text: string;
  winning_side: string | null;
  home_signup: {
    name: string;
    team: {
      name: string;
      logo?: {
        url: string;
      };
    };
  };
  away_signup: {
    name: string;
    team: {
      name: string;
      logo?: {
        url: string;
      };
    };
  };
}

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const isFinished = match.finished_at !== null;
  const homeTeam = match.home_signup;
  const awayTeam = match.away_signup;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('no-NO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('no-NO', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getWinnerStyle = (side: 'home' | 'away') => {
    if (!isFinished || !match.winning_side) return '';
    return match.winning_side === side
      ? 'ring-2 ring-green-500 bg-green-500/10'
      : 'opacity-75';
  };

  return (
    <Link href={`/kamper/${match.id}`}>
      <Card className='bg-slate-800/80 border-slate-700 hover:bg-slate-800/90 transition-all duration-200 backdrop-blur-sm cursor-pointer hover:scale-105'>
        <CardContent className='p-6'>
          {/* Round and Status */}
          <div className='flex items-center justify-between mb-4'>
            <Badge
              variant='outline'
              className='border-slate-600 text-slate-300'
            >
              {match.round_identifier_text}
            </Badge>
            <div className='flex items-center gap-2'>
              {isFinished ? (
                <Badge className='bg-green-600 hover:bg-green-700'>
                  <Trophy className='w-3 h-3 mr-1' />
                  Finished
                </Badge>
              ) : (
                <Badge
                  variant='secondary'
                  className='bg-blue-600 hover:bg-blue-700'
                >
                  <Clock className='w-3 h-3 mr-1' />
                  Upcoming
                </Badge>
              )}
            </div>
          </div>

          {/* Teams */}
          <div className='space-y-3 mb-4'>
            {/* Home Team */}
            <div
              className={`flex items-center justify-between p-3 rounded-lg bg-slate-700/50 ${getWinnerStyle(
                'home'
              )}`}
            >
              <div className='flex items-center gap-3'>
                {homeTeam.team.logo?.url && (
                  <img
                    src={homeTeam.team.logo.url || '/placeholder.svg'}
                    alt={homeTeam.team.name}
                    className='w-8 h-8 rounded object-cover'
                  />
                )}
                <span className='font-medium text-white truncate'>
                  {homeTeam.name}
                </span>
              </div>
              <div className='text-xl font-bold text-white'>
                {isFinished ? match.home_score ?? '-' : '-'}
              </div>
            </div>

            {/* VS Divider */}
            <div className='text-center'>
              <span className='text-slate-400 font-medium'>VS</span>
            </div>

            {/* Away Team */}
            <div
              className={`flex items-center justify-between p-3 rounded-lg bg-slate-700/50 ${getWinnerStyle(
                'away'
              )}`}
            >
              <div className='flex items-center gap-3'>
                {awayTeam.team.logo?.url && (
                  <img
                    src={awayTeam.team.logo.url || '/placeholder.svg'}
                    alt={awayTeam.team.name}
                    className='w-8 h-8 rounded object-cover'
                  />
                )}
                <span className='font-medium text-white truncate'>
                  {awayTeam.name}
                </span>
              </div>
              <div className='text-xl font-bold text-white'>
                {isFinished ? match.away_score ?? '-' : '-'}
              </div>
            </div>
          </div>

          {/* Match Time */}
          <div className='flex items-center gap-2 text-slate-400 text-sm'>
            <Calendar className='w-4 h-4' />
            <span>{formatDate(match.start_time)}</span>
            <span>•</span>
            <Clock className='w-4 h-4' />
            <span>{formatTime(match.start_time)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
