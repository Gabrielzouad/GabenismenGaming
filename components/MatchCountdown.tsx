'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { fetchTeamMatches } from '../app/api/gamerapi';
import type { Match } from '../types/types';
import { calculateTimeLeft } from '../lib/utils'; // Ensure this utility is properly defined
import Image from 'next/image';

const MatchCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<{
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  }>({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [matches, setMatches] = useState<Match[]>([]);

  // Fetch matches and update state
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data: Match[] = await fetchTeamMatches();
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };
    fetchMatches();
  }, []);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(matches));
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(matches));
    }, 1000);

    return () => clearInterval(timer);
  }, [matches]);

  // Find the next match and the following two matches
  const upcomingMatches = matches
    .filter((match) => new Date(match.start_time) > new Date())
    .sort(
      (a, b) =>
        new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
    );

  const nextMatch = upcomingMatches.length > 0 ? upcomingMatches[0] : null;
  const nextTwoMatches = upcomingMatches.slice(1, 3);

  return (
    <Card className='relative glassmorphism-card container w-full my-8 rounded-lg text-white'>
      <CardContent className='flex flex-col md:flex-row justify-center items-center'>
        {/* Display the next match with logo and timer */}
        {nextMatch ? (
          <div className='w-full mb-6'>
            <CardHeader className='text-center'>
              <h1 className='text-2xl font-extralight flex items-center justify-center'>
                <LeagueLogo className='w-8 h-8 mr-2' />
                Good Game-ligaen
              </h1>
              <h2 className='text-3xl font-semibold italic mt-2'>
                {nextMatch.home_signup.team.name} vs{' '}
                {nextMatch.away_signup.team.name}
              </h2>
            </CardHeader>
            <div className='flex items-center justify-center space-x-8 mb-4'>
              <img
                src={nextMatch.home_signup.team.logo.url}
                alt={`${nextMatch.home_signup.team.name} logo`}
                className='w-16 h-16'
              />
              <p className='font-extrabold text-2xl opacity-80 italic'>VS</p>
              <img
                src={nextMatch.away_signup.team.logo.url}
                alt={`${nextMatch.away_signup.team.name} logo`}
                className='w-16 h-16'
              />
            </div>
            <div className='flex justify-center items-center gap-4 md:gap-6 leading-none'>
              <div className='text-xl flex flex-col justify-center items-center'>
                <p className='text-4xl font-medium text-center'>
                  {timeLeft.days}
                </p>
                <p className='text-center text-xs text-gray-400'>Days</p>
              </div>
              <div className='text-xl flex flex-col justify-center items-center'>
                <p className='text-4xl font-medium text-center'>
                  {timeLeft.hours}
                </p>
                <p className='text-center text-xs text-gray-400'>Hours</p>
              </div>
              <div className='text-xl flex flex-col justify-center items-center'>
                <p className='text-4xl font-medium text-center'>
                  {timeLeft.minutes}
                </p>
                <p className='text-center text-xs text-gray-400'>Minutes</p>
              </div>
              <div className='text-xl flex flex-col justify-center items-center'>
                <p className='text-4xl font-medium text-center'>
                  {timeLeft.seconds}
                </p>
                <p className='text-center text-xs text-gray-400'>Seconds</p>
              </div>
            </div>
          </div>
        ) : (
          <p>No upcoming matches found.</p>
        )}

        {/* Display the next two matches */}
        {nextTwoMatches.length > 0 && (
          <div className='w-full space-y-4'>
            <h3 className='text-xl font-semibold'>Next Matches</h3>
            {nextTwoMatches.map((match) => (
              <div
                key={match.id}
                className='p-4 border border-gray-300 rounded-lg'
              >
                <h4 className='font-semibold'>
                  {match.home_signup.team.name} vs {match.away_signup.team.name}
                </h4>
                <p>{new Date(match.start_time).toLocaleString()}</p>

                {match.cancelled && (
                  <p className='text-red-500 mt-2'>This match was cancelled</p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MatchCountdown;

const LeagueLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      width='32'
      height='32'
      viewBox='0 0 50 50'
      fill='currentColor'
      className={className}
    >
      <path d='M 11 3 C 10.621 3 10.275469 3.2137344 10.105469 3.5527344 C 9.9364688 3.8917344 9.9712188 4.2966094 10.199219 4.5996094 L 13 8.3320312 L 13 41.667969 L 9.1992188 45.400391 C 8.9722187 45.703391 8.9374687 46.108266 9.1054688 46.447266 C 9.2754687 46.786266 9.621 47 10 47 L 39 47 C 39.304 47 39.59125 46.862 39.78125 46.625 L 44.78125 41.625 C 45.02125 41.324 45.066391 40.913406 44.900391 40.566406 C 44.733391 40.221406 44.385 40 44 40 L 23 40 L 23 4 C 23 3.447 22.553 3 22 3 L 11 3 z M 25 7 L 25 9 C 34.925 9 43 17.075 43 27 C 43 31.144 41.578797 34.954 39.216797 38 L 41.685547 38 C 43.774547 34.841 45 31.063 45 27 C 45 15.972 36.028 7 25 7 z M 25 11 L 25 38 L 36.589844 38 C 39.315844 35.13 41 31.262 41 27 C 41 18.178 33.822 11 25 11 z M 11 12.740234 C 7.544 16.134234 5.3072969 20.765109 5.0292969 25.912109 C 5.0102969 26.272109 5 26.635 5 27 C 5 27.59 5.0261719 28.174953 5.0761719 28.751953 C 5.5021719 33.631953 7.693 38.012766 11 41.259766 L 11 38.287109 C 8.503 35.197109 7 31.273 7 27 C 7 22.727 8.503 18.802891 11 15.712891 L 11 12.740234 z M 11 19.271484 C 9.729 21.564484 9 24.198 9 27 C 9 29.802 9.729 32.435516 11 34.728516 L 11 19.271484 z'></path>
    </svg>
  );
};
