'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { fetchTeamMatches } from '../app/api/gamerapi';
import type { Match } from '../types/types';
import { calculateTimeLeft } from '../lib/utils'; // Ensure this utility is properly defined

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
      <CardContent className='flex justify-center items-center'>
        {/* Display the next match with logo and timer */}
        {nextMatch ? (
          <div className='w-full mb-6'>
            <CardHeader className='text-center'>
              <h1 className='text-2xl font-extralight'>Good Game-ligaen</h1>
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
          <div className='w-full mt-6'>
            <h3 className='text-xl font-semibold mb-4 blur-3xl'>
              Next Matches
            </h3>
            {nextTwoMatches.map((match) => (
              <div
                key={match.id}
                className='mb-4 p-4 border border-gray-300 rounded-lg'
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
