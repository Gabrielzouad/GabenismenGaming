// types.ts

export interface TeamLogo {
    id: number;
    ratio: number;
    width: number;
    height: number;
    mimetype: string;
    url: string;
  }
  
  export interface Team {
    id: number;
    name: string;
    common_name: string | null;
    url: string;
    logo: TeamLogo;
  }
  
  export interface Signup {
    id: number;
    name: string;
    team: Team;
  }
  
  export interface Match {
    id: number;
    url: string;
    start_time: string;
    finished_at: string | null;
    home_score: number | null;
    away_score: number | null;
    walkover: boolean;
    postponed: boolean;
    cancelled: boolean;
    round_number: number;
    round_identifier: string;
    round_identifier_text: string;
    winning_side: 'home' | 'away' | null;
    bracket: string;
    home_signup: Signup;
    away_signup: Signup;
    competition: {
      id: number;
      name: string;
      url: string;
      game: {
        title: string;
        acronym: string;
        logo: {
          width: number;
          height: number;
          ratio: number;
          url: string;
        };
        slug: string;
      };
      type: {
        name: string;
      };
    };
    division: {
      id: number;
      name: string;
    };
    videos: any[]; // Adjust if you have more details about videos
  }
  

  export interface TeamData {
    name: string
    players: PlayerOverview[]
  }
  
  export interface PlayerOverview {
    id: string
    name: string
    role: string
    totalKills: number
    totalDeaths: number
    totalAssists: number
    totalWins: number
    totalLosses: number
    avatarUrl: string
  }
  
  export interface PlayerDetails {
    id: string
    name: string
    role: string
    avatarUrl: string
    totalKills: number
    totalDeaths: number
    totalAssists: number
    totalWins: number
    totalLosses: number
    championStats: ChampionStat[]
  }
  
  export interface ChampionStat {
    championId: number
    championName: string
    championImage: string
    gamesPlayed: number
    wins: number
    kills: number
    deaths: number
    assists: number
  }
  
  