const TOKEN = '20|RwUdJUBiWgLIcX8zlm8e0rlAdZS4Dgml1hHW5jPd';

// Simple in-memory cache
const cache = new Map();

async function fetchWithCache(url, options) {
  if (cache.has(url)) {
    return cache.get(url);
  }

  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`API call failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  cache.set(url, data);
  return data;
}

export async function fetchTeamData() {
  const url = '/api/team';
  return fetchWithCache(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/json',
    },
  });
}

export async function fetchTeamMatches() {
  // Check if we are running on the server (SSR)
  const isServer = typeof window === 'undefined';

  // Use the full URL if server-side, otherwise use the relative URL on the client-side
  const baseURL = isServer ? process.env.NEXT_PUBLIC_API_URL : ''; // Full URL for SSR
  const url = `${baseURL}/api/matches`; // Combine baseURL and endpoint

  const data = await fetchWithCache(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/json',
    },
  });
  return data.data || [];
}
export async function fetchMatchStats(matchId) {
  const url = `https://www.gamer.no/api/paradise/v2/matchup/${encodeURIComponent(
    matchId
  )}/stats`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/json',
    },
    cache: 'no-store', // disable caching to ensure freshness
  });
  if (!res.ok) throw new Error(`Stats fetch failed: ${res.status}`);
  return res.json();
}

export async function fetchPlayerStats(playerIds) {
  try {
    // Fetch team data and matches in parallel
    const [teamData, matches] = await Promise.all([
      fetchTeamData(),
      fetchTeamMatches(),
    ]);

    // Initialize player stats with basic info
    const playerStats = playerIds
      .map((id) => {
        const player = teamData.find((member) => member.user.id === id);
        if (!player) return null;

        return {
          id: id,
          name: player.user.user_name,
          role: player.localized_role,
          avatarUrl: player.user.avatar?.url || '/placeholder.svg',
          stats: {
            totalKills: 0,
            totalDeaths: 0,
            totalAssists: 0,
            totalGames: 0,
            totalDamageDealt: 0,
            totalVisionScore: 0,
            champions: {},
            winRate: 0,
            wins: 0,
          },
        };
      })
      .filter(Boolean);

    // Fetch all match stats in parallel
    const matchStatsPromises = matches.map((match) =>
      fetchMatchStats(match.id)
    );
    const allMatchStats = await Promise.all(matchStatsPromises);

    // Aggregate stats
    allMatchStats.forEach((matchStats) => {
      matchStats.forEach((stat) => {
        const player = playerStats.find((p) => p.id === stat.remoteId);
        if (player) {
          player.stats.totalKills += stat.kills || 0;
          player.stats.totalDeaths += stat.deaths || 0;
          player.stats.totalAssists += stat.assists || 0;
          player.stats.totalGames += 1;
          player.stats.totalDamageDealt +=
            stat.totalDamageDealtToChampions || 0;
          player.stats.totalVisionScore += stat.visionScore || 0;
          player.stats.wins += stat.win ? 1 : 0;

          // Track champion stats
          if (stat.championName) {
            if (!player.stats.champions[stat.championName]) {
              player.stats.champions[stat.championName] = {
                name: stat.championName,
                image: stat.championImage,
                games: 0,
                wins: 0,
                kills: 0,
                deaths: 0,
                assists: 0,
              };
            }

            const championStats = player.stats.champions[stat.championName];
            championStats.games += 1;
            championStats.wins += stat.win ? 1 : 0;
            championStats.kills += stat.kills || 0;
            championStats.deaths += stat.deaths || 0;
            championStats.assists += stat.assists || 0;
          }
        }
      });
    });

    // Calculate win rates and convert champions object to array
    playerStats.forEach((player) => {
      player.stats.winRate = (
        (player.stats.wins / player.stats.totalGames) *
        100
      ).toFixed(1);
      player.stats.champions = Object.values(player.stats.champions).sort(
        (a, b) => b.games - a.games
      );
    });

    return playerStats;
  } catch (error) {
    console.error('Error fetching player stats:', error);
    throw error;
  }
}
