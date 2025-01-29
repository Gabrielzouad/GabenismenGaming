import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Match } from '../types/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const formatToTwoDigits = (num: number): string => num.toString().padStart(2, '0');

export const calculateTimeLeft = (matches: Match[]): { days: string; hours: string; minutes: string; seconds: string } => {
  if (matches.length === 0) return { days: '00', hours: '00', minutes: '00', seconds: '00' };

  const now = new Date();
  const upcomingMatches = matches
    .filter(match => new Date(match.start_time) > now)
    .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());

  if (upcomingMatches.length === 0) return { days: '00', hours: '00', minutes: '00', seconds: '00' };

  const nextMatch = upcomingMatches[0];
  const endDate = new Date(nextMatch.start_time);
  const difference = endDate.getTime() - now.getTime();

  if (difference <= 0) return { days: '00', hours: '00', minutes: '00', seconds: '00' };

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    days: formatToTwoDigits(days),
    hours: formatToTwoDigits(hours),
    minutes: formatToTwoDigits(minutes),
    seconds: formatToTwoDigits(seconds),
  };
};

export function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("no-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

