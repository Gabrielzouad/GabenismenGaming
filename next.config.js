/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/matches',
        destination:
          'https://www.gamer.no/api/paradise/v2/matchup?competition_id=13599&team_id=162570',
      },
      {
        source: '/api/team',
        destination: 'https://www.gamer.no/api/paradise/v2/team/162570/players', // Adjust this URL to the correct endpoint for team data
      },

      {
        source: '/api/matchup/:id/stats',
        destination: 'https://www.gamer.no/api/paradise/v2/matchup/:id/stats',
      },
    ];
  },
  images: {
    remotePatterns: [
      { hostname: 'images.ctfassets.net', protocol: 'https' },
      { hostname: 'i.bo3.no', protocol: 'https' }, // Add this line to allow images from the Gamer API
      { hostname: 'ddragon.leagueoflegends.com', protocol: 'https' }, // Add this line to allow images from the Riot API
    ],
  },
};

module.exports = nextConfig;
