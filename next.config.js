// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/matches', // Internal endpoint you will use
        destination:
          'https://www.gamer.no/api/paradise/v2/matchup?competition_id=12465&team_id=176129', // External API endpoint
      },
    ];
  },
  images: {
    remotePatterns: [{ hostname: 'images.ctfassets.net', protocol: 'https' }], // Add your image domains here
  },
};

module.exports = nextConfig;
