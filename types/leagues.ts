export interface League {
  id: string;
  name: string;
  country: string;
  logo: string;
  type: 'domestic' | 'european';
}

export interface Match {
  id: string;
  league: League;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  homeLogo: string;
  awayLogo: string;
  prediction?: {
    outcome: 'Home Win' | 'Draw' | 'Away Win';
    confidence: 'High' | 'Medium' | 'Low';
    analysis: string;
  };
} 