'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchPlayerStats } from '@/api/gamerapi';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';

const PLAYER_IDS = [39713, 114963, 114900, 114978, 118560];

interface PlayerStats {
  id: number;
  name: string;
  avatarUrl: string;
  role: string;
  stats: {
    totalGames: number;
    winRate: number;
    totalKills: number;
    totalDeaths: number;
    totalAssists: number;
    champions: {
      name: string;
      image: string;
      games: number;
      wins: number;
      kills: number;
      deaths: number;
      assists: number;
    }[];
  };
}

export default function SpillerePage() {
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPlayerStats() {
      try {
        setIsLoading(true);
        const data = await fetchPlayerStats(PLAYER_IDS);
        setPlayerStats(data);
      } catch (err) {
        setError('Failed to load player stats. Please try again later.');
        console.error('Error fetching player stats:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadPlayerStats();
  }, []);

  return (
    <div className='min-h-screen bg-[#1a1f2e] text-white'>
      <div className='container mx-auto py-8 px-4'>
        <h1 className='text-4xl font-bold mb-8'>Player Statistics</h1>
        {isLoading && <div className='text-center'>Loading player data...</div>}
        {error && <div className='text-center text-red-500'>{error}</div>}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {playerStats.map((player) => (
            <Card
              key={player.id}
              className='bg-[#242b3d] border-none text-white'
            >
              <CardHeader>
                <CardTitle className='flex items-center gap-4'>
                  <Image
                    src={player.avatarUrl || '/placeholder.svg'}
                    alt={player.name}
                    width={64}
                    height={64}
                    className='rounded-full'
                  />
                  <div>
                    <p className='text-xl'>{player.name}</p>
                    <p className='text-sm text-gray-400'>{player.role}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue='overview' className='w-full'>
                  <TabsList className='grid w-full grid-cols-2 gap-1 bg-[#1c253f]'>
                    <TabsTrigger
                      value='overview'
                      className='data-[state=active]:bg-[#242b3d] data-[state=active]:text-white transition-all border border-transparent data-[state=active]:border-gray-600'
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value='champions'
                      className=' data-[state=active]:bg-[#242b3d] data-[state=active]:text-white transition-all border border-transparent data-[state=active]:border-gray-600'
                    >
                      Champions
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value='overview' className='p-4'>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <p className='text-sm text-gray-400'>Games Played</p>
                        <p className='text-lg'>{player.stats.totalGames}</p>
                      </div>
                      <div>
                        <p className='text-sm text-gray-400'>Win Rate</p>
                        <p className='text-lg'>{player.stats.winRate}%</p>
                      </div>
                      <div>
                        <p className='text-sm text-gray-400'>KDA</p>
                        <p className='text-lg'>
                          {player.stats.totalKills}/{player.stats.totalDeaths}/
                          {player.stats.totalAssists}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm text-gray-400'>KDA Ratio</p>
                        <p className='text-lg'>
                          {(
                            (player.stats.totalKills +
                              player.stats.totalAssists) /
                            Math.max(1, player.stats.totalDeaths)
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value='champions' className='p-4'>
                    <div className='space-y-4'>
                      {player.stats.champions.slice(0, 3).map((champion) => (
                        <div
                          key={champion.name}
                          className='flex items-center gap-4'
                        >
                          <Image
                            src={champion.image || '/placeholder.svg'}
                            alt={champion.name}
                            width={40}
                            height={40}
                            className='rounded-full'
                          />
                          <div className='flex-1'>
                            <p className='text-sm font-medium'>
                              {champion.name}
                            </p>
                            <p className='text-xs text-gray-400'>
                              {champion.games} games -{' '}
                              {((champion.wins / champion.games) * 100).toFixed(
                                1
                              )}
                              % WR
                            </p>
                          </div>
                          <div className='text-sm text-gray-400'>
                            {champion.kills}/{champion.deaths}/
                            {champion.assists}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
