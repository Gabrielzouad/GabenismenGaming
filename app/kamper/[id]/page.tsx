import { fetchMatchStats } from '@/api/gamerapi';
import { MatchHeader } from '../../../components/matchCards/match-header';
import { PlayerStatsTable } from '../../../components/matchCards/player-stats-table';
import { TeamComparison } from '../../../components/matchCards/team-comparison';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Badge } from 'lucide-react';

interface MatchStatisticsPageProps {
  params: {
    id: string;
  };
}

export default async function MatchStatisticsPage({
  params,
}: MatchStatisticsPageProps) {
  const statistics = await fetchMatchStats(params.id);

  // Separate players by team
  const homePlayers = statistics.filter((player) => player.side === 'home');
  const awayPlayers = statistics.filter((player) => player.side === 'away');

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
      <div className='container mx-auto px-4 py-8'>
        {/* Match Header */}
        <MatchHeader matchId={params.id} />

        {/* Team Comparison */}
        <TeamComparison homePlayers={homePlayers} awayPlayers={awayPlayers} />

        {/* Player Statistics Tables */}
        <div className='space-y-8'>
          {/* Away Team (Winners) */}
          {awayPlayers.length > 0 && (
            <Card className='bg-slate-800/80 border-slate-700 backdrop-blur-sm'>
              <CardHeader>
                <CardTitle className='text-white flex items-center gap-2'>
                  Away Team Statistics
                  <Badge className='bg-green-600'>Winners</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PlayerStatsTable players={awayPlayers} />
              </CardContent>
            </Card>
          )}

          {/* Home Team */}
          {homePlayers.length > 0 && (
            <Card className='bg-slate-800/80 border-slate-700 backdrop-blur-sm'>
              <CardHeader>
                <CardTitle className='text-white'>
                  Home Team Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PlayerStatsTable players={homePlayers} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
