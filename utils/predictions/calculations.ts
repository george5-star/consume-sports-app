import { Match } from './types';

// Team form calculation (last 5 matches)
export const calculateTeamForm = (team: any): number => {
  // This would come from a historical data API
  const recentMatches = [
    { result: 'W', score: '2-0' },
    { result: 'D', score: '1-1' },
    { result: 'W', score: '3-1' },
    { result: 'L', score: '0-2' },
    { result: 'W', score: '2-1' },
  ];

  const points = recentMatches.reduce((total, match) => {
    switch (match.result) {
      case 'W': return total + 3;
      case 'D': return total + 1;
      default: return total;
    }
  }, 0);

  return points / 15; // Normalize to 0-1 range
};

// Head-to-head calculation
export const calculateHeadToHead = (homeTeam: any, awayTeam: any): number => {
  // This would come from a historical data API
  const lastMatches = [
    { home: homeTeam, away: awayTeam, result: 'W', score: '2-0' },
    { home: awayTeam, away: homeTeam, result: 'D', score: '1-1' },
    { home: homeTeam, away: awayTeam, result: 'W', score: '3-1' },
  ];

  const homeWins = lastMatches.filter(m => m.result === 'W').length;
  return homeWins / lastMatches.length;
};

// League position impact
export const calculateLeaguePositionImpact = (homePosition: number, awayPosition: number): number => {
  const positionDiff = Math.abs(homePosition - awayPosition);
  return 1 - (positionDiff / 20); // Normalize to 0-1 range
};

// Injuries impact
export const calculateInjuriesImpact = (team: any): number => {
  // This would come from a team news API
  const injuries = {
    keyPlayers: 2,
    totalPlayers: 5,
    squadSize: 25,
  };

  return 1 - ((injuries.keyPlayers * 0.5 + injuries.totalPlayers * 0.5) / injuries.squadSize);
};

// Venue strength calculation
export const calculateVenueStrength = (team: any, isHome: boolean): number => {
  // This would come from a historical data API
  const homeStats = {
    wins: 8,
    draws: 2,
    losses: 1,
    goalsScored: 25,
    goalsConceded: 10,
  };

  const totalMatches = homeStats.wins + homeStats.draws + homeStats.losses;
  const winRate = homeStats.wins / totalMatches;
  const goalDifference = (homeStats.goalsScored - homeStats.goalsConceded) / totalMatches;

  return isHome ? (winRate + goalDifference / 2) : (1 - winRate - goalDifference / 2);
};

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

// Referee impact calculation
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

// Team news impact calculation
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

// Betting market impact calculation
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