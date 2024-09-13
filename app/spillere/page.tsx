'use client';

import { Player, PlayerCard } from '../../components/PlayerCards/PlayerCard';
import { Badge } from '../../components/ui/badge';

type Team = {
  name: string;
  players: Player[];
  achievements: string[];
};

const team: Team = {
  name: 'Gabenismen Gaming x D32',
  achievements: [
    '3 x Good Game Condenders',
    'Team of the Year 2020',
    'Pro Clubs Playoff Winner 2021',
  ],
  players: [
    {
      name: 'Jørgen Braastad',
      ign: 'Jørgen Braastad',
      role: 'Top Laner',
      avatar: '/leagueImages/Jayce.webp',
      socialMedia: { twitter: '#', twitch: '#', instagram: '#' },
    },
    {
      name: 'Håkon Bolle',
      ign: 'HBolle',
      role: 'Jungler',
      avatar: '/leagueImages/viego.jpg',
      socialMedia: { twitter: '#', twitch: '#', instagram: '#' },
    },
    {
      name: 'Joshua Nguyen',
      ign: 'Sukon',
      role: 'Mid Laner',
      avatar: '/leagueImages/TwistedFate.webp',
      socialMedia: { twitter: '#', twitch: '#', instagram: '#' },
    },
    {
      name: 'Theo Soo',
      ign: 'Brur',
      role: 'Bot Laner',
      avatar: '/leagueImages/Jhin.webp',
      socialMedia: { twitter: '#', twitch: '#', instagram: '#' },
    },
    {
      name: 'Gabriel Zouad',
      ign: 'Gabriel Zouad',
      role: 'Support',
      avatar: '/leagueImages/thresh.webp',
      socialMedia: { twitter: '#', twitch: '#', instagram: '#' },
    },
  ],
};

export default async function spillere() {
  return (
    <section className='h-screen mb-20'>
      <header className='bg-gradient-to-r from-red-700 to-violet-600 py-20 '>
        <div className='container mx-auto px-4 text-white'>
          <h1 className='text-4xl font-bold mb-4'>{team.name}</h1>
          <p className='text-xl mb-6'>
            Dominerer esports-scenen med følgende prestasjoner:
          </p>
          <div className='flex flex-wrap gap-2'>
            {team.achievements.map((achievement, index) => (
              <Badge
                key={index}
                variant='secondary'
                className='bg-gray-50 text-gray-900 text-md'
              >
                {achievement}
              </Badge>
            ))}
          </div>
        </div>
      </header>

      <main className='container mx-auto px-4 py-16'>
        <section className='mb-16'>
          <h2 className='text-3xl font-bold mb-8 text-white'>
            Leauge of Legends
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6'>
            {team.players.map((player) => (
              <PlayerCard key={player.name} player={player} />
            ))}
          </div>
        </section>
        <section className='mb-16'>
          <h2 className='text-3xl font-bold mb-8 text-white'>FC24 Pro Clubs</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6'>
            {team.players.map((player) => (
              <PlayerCard key={player.name} player={player} />
            ))}
          </div>
        </section>
      </main>
    </section>
  );
}
