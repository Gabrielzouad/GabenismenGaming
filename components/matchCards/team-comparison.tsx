import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface PlayerStats {
  kills: number;
  deaths: number;
  assists: number;
  damage_per_round: string;
  rating: string;
  side: string;
}

interface TeamComparisonProps {
  homePlayers: PlayerStats[];
  awayPlayers: PlayerStats[];
}

export function TeamComparison({
  homePlayers,
  awayPlayers,
}: TeamComparisonProps) {
  const calculateTeamStats = (players: PlayerStats[]) => {
    if (players.length === 0)
      return { kills: 0, deaths: 0, assists: 0, avgRating: 0, avgADR: 0 };

    const totalKills = players.reduce((sum, p) => sum + p.kills, 0);
    const totalDeaths = players.reduce((sum, p) => sum + p.deaths, 0);
    const totalAssists = players.reduce((sum, p) => sum + p.assists, 0);
    const avgRating =
      players.reduce((sum, p) => sum + Number.parseFloat(p.rating), 0) /
      players.length;
    const avgADR =
      players.reduce(
        (sum, p) => sum + Number.parseFloat(p.damage_per_round),
        0
      ) / players.length;

    return {
      kills: totalKills,
      deaths: totalDeaths,
      assists: totalAssists,
      avgRating,
      avgADR,
    };
  };

  const homeStats = calculateTeamStats(homePlayers);
  const awayStats = calculateTeamStats(awayPlayers);

  const StatComparison = ({
    label,
    homeValue,
    awayValue,
    format = (v: number) => v.toString(),
  }: {
    label: string;
    homeValue: number;
    awayValue: number;
    format?: (value: number) => string;
  }) => {
    const homeWins = homeValue > awayValue;
    const awayWins = awayValue > homeValue;

    return (
      <div className='flex items-center justify-between py-2'>
        <div
          className={`text-right flex-1 ${
            homeWins ? 'text-green-400 font-bold' : 'text-slate-300'
          }`}
        >
          {format(homeValue)}
        </div>
        <div className='px-4 text-slate-400 font-medium min-w-[120px] text-center'>
          {label}
        </div>
        <div
          className={`text-left flex-1 ${
            awayWins ? 'text-green-400 font-bold' : 'text-slate-300'
          }`}
        >
          {format(awayValue)}
        </div>
      </div>
    );
  };

  return (
    <Card className='bg-slate-800/80 border-slate-700 backdrop-blur-sm mb-8'>
      <CardHeader>
        <CardTitle className='text-white text-center'>
          Team Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-3 gap-4 mb-6'>
          <div className='text-center'>
            <h3 className='text-lg font-semibold text-white mb-2'>Home Team</h3>
            <Badge
              variant='outline'
              className='border-slate-600 text-slate-300'
            >
              {homePlayers.length} Players
            </Badge>
          </div>
          <div className='text-center'>
            <h3 className='text-lg font-semibold text-slate-400'>VS</h3>
          </div>
          <div className='text-center'>
            <h3 className='text-lg font-semibold text-white mb-2'>Away Team</h3>
            <Badge className='text-green-600'>
              {awayPlayers.length} Players • Winners
            </Badge>
          </div>
        </div>

        <div className='space-y-1'>
          <StatComparison
            label='Total Kills'
            homeValue={homeStats.kills}
            awayValue={awayStats.kills}
          />
          <StatComparison
            label='Total Deaths'
            homeValue={homeStats.deaths}
            awayValue={awayStats.deaths}
          />
          <StatComparison
            label='Total Assists'
            homeValue={homeStats.assists}
            awayValue={awayStats.assists}
          />
          <StatComparison
            label='Avg Rating'
            homeValue={homeStats.avgRating}
            awayValue={awayStats.avgRating}
            format={(v) => v.toFixed(2)}
          />
          <StatComparison
            label='Avg ADR'
            homeValue={homeStats.avgADR}
            awayValue={awayStats.avgADR}
            format={(v) => v.toFixed(0)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
