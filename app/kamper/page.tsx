import { fetchTeamMatches } from '@/api/gamerapi';
import Image from 'next/image';
import MatchCountdown from '../../components/MatchCountdown';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { cn, formatDate } from '../../lib/utils';

export default async function MatchesPage() {
  let matches: Array<{
    id: string;
    competition: { name: string };
    division: { name: string };
    start_time: string;
    home_signup: { team: { logo?: { url: string }; name: string } };
    away_signup: { team: { logo?: { url: string }; name: string } };
    home_score?: number;
    away_score?: number;
    finished_at?: string;
    winning_side?: 'home' | 'away';
  }> = [];
  let error: string | null = null;
  try {
    matches = await fetchTeamMatches();
  } catch (err) {
    console.error('Error fetching matches:', err);
    error = 'Failed to load matches. Please try again later.';
  }

  if (error) {
    return (
      <div className='min-h-screen bg-[#1a1f2e] text-white'>
        <div className='container mx-auto py-4 px-4 sm:py-8'>
          <h1 className='text-2xl sm:text-4xl font-bold mb-4 sm:mb-8'>
            Matches
          </h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#1a1f2e] text-white'>
      <div className='container mx-auto py-4 px-2 sm:px-4 md:px-6 lg:px-8 sm:py-8'>
        <h1 className='text-2xl sm:text-4xl font-bold mb-4 sm:mb-8'>Matches</h1>
        <MatchCountdown />
        <div className='grid gap-4 sm:gap-6'>
          {matches.map((match) => (
            <Card
              key={match.id}
              className={cn('bg-[#242b3d] border-none text-white')}
            >
              <CardHeader className='flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  {match.competition.name} - {match.division.name}
                </CardTitle>
                <div className='text-sm text-gray-400'>
                  {formatDate(match.start_time)}
                </div>
              </CardHeader>
              <CardContent>
                <div className='flex flex-col sm:flex-row items-center justify-between p-2 sm:p-3 md:p-6'>
                  <div className='flex flex-col sm:flex-row items-center w-full'>
                    <div className='flex items-center gap-2 sm:gap-4 mb-2 sm:mb-0'>
                      <div className='w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 relative flex-shrink-0'>
                        <Image
                          src={
                            match.home_signup.team.logo?.url ||
                            '/placeholder.svg'
                          }
                          alt={match.home_signup.team.name}
                          fill
                          className='object-contain'
                        />
                      </div>
                      <span className='text-base sm:text-sm md:text-lg font-semibold truncate'>
                        {match.home_signup.team.name}
                      </span>
                    </div>
                    <div className='h-px w-full sm:h-8 sm:w-px bg-gray-600 my-2 sm:my-0 sm:mx-2 md:mx-4'></div>
                    <div className='flex items-center gap-2 sm:gap-4 mt-2 sm:mt-0'>
                      <div className='w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 relative flex-shrink-0'>
                        <Image
                          src={
                            match.away_signup.team.logo?.url ||
                            '/placeholder.svg'
                          }
                          alt={match.away_signup.team.name}
                          fill
                          className='object-contain'
                        />
                      </div>
                      <span className='text-base sm:text-sm md:text-lg font-semibold truncate'>
                        {match.away_signup.team.name}
                      </span>
                    </div>
                  </div>
                  <div className='flex flex-col items-center justify-center mx-2 sm:mx-2 md:mx-4 my-4 sm:my-0'>
                    <div className='flex items-center gap-2 sm:gap-4 font-bold'>
                      <span className='text-xl sm:text-lg md:text-2xl'>
                        {match.home_score ?? '-'}
                      </span>
                      <span className='text-gray-400 text-lg sm:text-xl px-2'>
                        vs
                      </span>
                      <span className='text-xl sm:text-lg md:text-2xl'>
                        {match.away_score ?? '-'}
                      </span>
                    </div>
                    <span className='text-xs text-gray-400 mt-1'>
                      {match.finished_at ? 'Final Score' : 'Upcoming'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
