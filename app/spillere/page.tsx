// components/Players.jsx
import React from 'react';
import { getAllPlayers } from '../../lib/api';
import PlayerCard from '../../components/PlayerCards/PlayerCard';

const Players = async () => {
  const players = await getAllPlayers();
  console.log(players);
  return (
    <div className='bg-gray-900 py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 text-center lg:px-8'>
        <div className='mx-auto max-w-2xl'>
          <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
            Våre Spillere
          </h2>
          <p className='mt-4 text-lg leading-8 text-gray-400'>
            Venner og familie står sterkest sammen
          </p>
        </div>
        <ul
          role='list'
          className='mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8'
        >
          <PlayerCard people={players} />
        </ul>
      </div>
    </div>
  );
};

export default Players;
