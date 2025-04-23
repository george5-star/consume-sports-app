import { Match } from './types';

// Additional prediction factors
export const ADDITIONAL_FACTORS = {
  WEATHER_WEIGHT: 0.05,
  REFEREE_WEIGHT: 0.05,
  TEAM_NEWS_WEIGHT: 0.1,
  BETTING_MARKET_WEIGHT: 0.1,
} as const;

// Weather impact calculation
export const calculateWeatherImpact = (match: Match): number => {
  // This would come from a weather API
  const weatherConditions = {
    temperature: 15, // Celsius
    precipitation: 0, // mm
    windSpeed: 10, // km/h
  };

  let impact = 1.0;

  // Temperature impact (optimal range: 15-20°C)
  if (weatherConditions.temperature < 10 || weatherConditions.temperature > 25) {
    impact *= 0.9;
  }

  // Precipitation impact
  if (weatherConditions.precipitation > 5) {
    impact *= 0.85;
  }

  // Wind impact
  if (weatherConditions.windSpeed > 20) {
    impact *= 0.9;
  }

  return impact;
};

// Referee statistics impact
export const calculateRefereeImpact = (match: Match): number => {
  // This would come from a referee statistics API
  const refereeStats = {
    homeWinRate: 0.45,
    awayWinRate: 0.35,
    drawRate: 0.20,
    cardsPerGame: 3.5,
    penaltiesPerGame: 0.3,
  };

  // Calculate referee bias
  const homeAdvantage = refereeStats.homeWinRate - refereeStats.awayWinRate;
  return 1 + (homeAdvantage * 0.1); // Normalize the impact
};

// Team news impact
export const calculateTeamNewsImpact = (team: any): number => {
  // This would come from a team news API
  const teamNews = {
    keyPlayersInjured: 2,
    keyPlayersSuspended: 1,
    newSignings: 1,
    managerChanges: 0,
  };

  let impact = 1.0;

  // Injuries and suspensions impact
  impact -= (teamNews.keyPlayersInjured + teamNews.keyPlayersSuspended) * 0.1;

  // New signings impact
  impact += teamNews.newSignings * 0.05;

  // Manager changes impact
  if (teamNews.managerChanges > 0) {
    impact *= 0.9;
  }

  return Math.max(0.5, Math.min(1.5, impact));
};

// Betting market impact
export const calculateBettingMarketImpact = (match: Match): number => {
  // This would come from a betting odds API
  const bettingOdds = {
    homeWin: 2.1,
    draw: 3.4,
    awayWin: 3.8,
    homeGoals: 1.5,
    awayGoals: 1.2,
  };

  // Calculate implied probabilities
  const homeWinProb = 1 / bettingOdds.homeWin;
  const drawProb = 1 / bettingOdds.draw;
  const awayWinProb = 1 / bettingOdds.awayWin;

  // Calculate market confidence
  const maxProb = Math.max(homeWinProb, drawProb, awayWinProb);
  return maxProb * 1.2; // Scale the impact
}; 