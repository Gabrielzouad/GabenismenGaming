import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface PlayerStats {
  paradise_user_id: number;
  player_name: string;
  kills: number;
  deaths: number;
  assists: number;
  kd_ratio: string;
  rating: string;
  damage_per_round: string;
  kast_ratio: string;
  headshot_ratio: string;
  opening_duel_win_ratio: string;
  clutches_won: number;
  user: {
    image?: {
      url: string;
    };
    nationality: string;
  };
}

interface PlayerStatsTableProps {
  players: PlayerStats[];
}

export function PlayerStatsTable({ players }: PlayerStatsTableProps) {
  const getRatingColor = (rating: string) => {
    const ratingNum = Number.parseFloat(rating);
    if (ratingNum >= 1.2) return 'text-green-400';
    if (ratingNum >= 1.0) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getKDColor = (kd: string) => {
    const kdNum = Number.parseFloat(kd);
    if (kdNum >= 1.2) return 'text-green-400';
    if (kdNum >= 1.0) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className='overflow-x-auto'>
      <table className='w-full text-sm'>
        <thead>
          <tr className='border-b border-slate-700'>
            <th className='text-left py-3 px-2 text-slate-300 font-medium'>
              Player
            </th>
            <th className='text-center py-3 px-2 text-slate-300 font-medium'>
              K
            </th>
            <th className='text-center py-3 px-2 text-slate-300 font-medium'>
              D
            </th>
            <th className='text-center py-3 px-2 text-slate-300 font-medium'>
              A
            </th>
            <th className='text-center py-3 px-2 text-slate-300 font-medium'>
              K/D
            </th>
            <th className='text-center py-3 px-2 text-slate-300 font-medium'>
              Rating
            </th>
            <th className='text-center py-3 px-2 text-slate-300 font-medium'>
              ADR
            </th>
            <th className='text-center py-3 px-2 text-slate-300 font-medium'>
              KAST%
            </th>
            <th className='text-center py-3 px-2 text-slate-300 font-medium'>
              HS%
            </th>
            <th className='text-center py-3 px-2 text-slate-300 font-medium'>
              Opening%
            </th>
            <th className='text-center py-3 px-2 text-slate-300 font-medium'>
              Clutches
            </th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr
              key={player.paradise_user_id}
              className='border-b border-slate-700/50 hover:bg-slate-700/30'
            >
              <td className='py-3 px-2'>
                <div className='flex items-center gap-3'>
                  <Avatar className='w-8 h-8'>
                    <AvatarImage
                      src={player.user.image?.url || '/placeholder.svg'}
                      alt={player.player_name}
                    />
                    <AvatarFallback className='bg-slate-600 text-white text-xs'>
                      {player.player_name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className='text-white font-medium'>
                      {player.player_name}
                    </div>
                    <div className='text-slate-400 text-xs'>
                      {player.user.nationality}
                    </div>
                  </div>
                </div>
              </td>
              <td className='text-center py-3 px-2 text-white font-medium'>
                {player.kills}
              </td>
              <td className='text-center py-3 px-2 text-white font-medium'>
                {player.deaths}
              </td>
              <td className='text-center py-3 px-2 text-white font-medium'>
                {player.assists}
              </td>
              <td
                className={`text-center py-3 px-2 font-medium ${getKDColor(
                  player.kd_ratio
                )}`}
              >
                {player.kd_ratio}
              </td>
              <td
                className={`text-center py-3 px-2 font-bold ${getRatingColor(
                  player.rating
                )}`}
              >
                {player.rating}
              </td>
              <td className='text-center py-3 px-2 text-white'>
                {player.damage_per_round}
              </td>
              <td className='text-center py-3 px-2 text-white'>
                {Math.round(Number.parseFloat(player.kast_ratio) * 100)}%
              </td>
              <td className='text-center py-3 px-2 text-white'>
                {Math.round(Number.parseFloat(player.headshot_ratio) * 100)}%
              </td>
              <td className='text-center py-3 px-2 text-white'>
                {Math.round(
                  Number.parseFloat(player.opening_duel_win_ratio) * 100
                )}
                %
              </td>
              <td className='text-center py-3 px-2 text-white'>
                {player.clutches_won}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
