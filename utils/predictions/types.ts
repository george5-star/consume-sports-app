export interface League {
  id: string;
  name: string;
  country: string;
  logo: string;
  type: string;
}

export interface Team {
  id: string;
  name: string;
  logo: string;
}

export interface Match {
  id: string;
  league: League;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  time: string;
  homeLogo: string;
  awayLogo: string;
}

export interface Prediction {
  matchId: string;
  homeScore: number;
  awayScore: number;
  confidence: number;
  reasoning: string;
}

export interface PredictionError {
  message: string;
  code?: string;
}

export interface PredictionResult {
  match: Match;
  prediction: Prediction;
  timestamp: number;
}

export interface MatchFeatures {
  homeForm: number;
  awayForm: number;
  headToHead: number;
  leaguePositionDiff: number;
  injuries: number;
  venueStrength: number;
  weather: number;
  referee: number;
  teamNews: number;
  bettingMarket: number;
} 