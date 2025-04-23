import { Match, Prediction } from './types';

// Constants for prediction factors
const PREDICTION_FACTORS = {
  HOME_ADVANTAGE: 0.1,
  FORM_WEIGHT: 0.3,
  HEAD_TO_HEAD_WEIGHT: 0.2,
  LEAGUE_POSITION_WEIGHT: 0.2,
  INJURIES_WEIGHT: 0.1,
  VENUE_WEIGHT: 0.1,
} as const;

// Team form calculation (last 5 matches)
const calculateTeamForm = (team: any): number => {
  // This would typically come from an API
  const recentMatches = [
    { result: 'W', score: '2-0' },
    { result: 'D', score: '1-1' },
    { result: 'W', score: '3-1' },
    { result: 'L', score: '0-2' },
    { result: 'W', score: '2-1' },
  ];

  const formPoints = recentMatches.reduce((total, match) => {
    switch (match.result) {
      case 'W': return total + 3;
      case 'D': return total + 1;
      default: return total;
    }
  }, 0);

  return formPoints / (recentMatches.length * 3);
};

// Head to head record calculation
const calculateHeadToHead = (homeTeam: any, awayTeam: any): number => {
  // This would typically come from an API
  const recentMeetings = [
    { homeScore: 2, awayScore: 1 },
    { homeScore: 1, awayScore: 1 },
    { homeScore: 3, awayScore: 0 },
  ];

  const homeWins = recentMeetings.filter(m => m.homeScore > m.awayScore).length;
  const draws = recentMeetings.filter(m => m.homeScore === m.awayScore).length;
  
  return (homeWins * 3 + draws) / (recentMeetings.length * 3);
};

// League position impact
const calculateLeaguePositionImpact = (homePosition: number, awayPosition: number): number => {
  const positionDiff = awayPosition - homePosition;
  return Math.tanh(positionDiff / 20); // Normalize the impact
};

// Injuries and suspensions impact
const calculateInjuriesImpact = (team: any): number => {
  // This would typically come from an API
  const keyPlayersInjured = 2;
  const totalKeyPlayers = 11;
  return 1 - (keyPlayersInjured / totalKeyPlayers);
};

// Venue strength calculation
const calculateVenueStrength = (team: any, isHome: boolean): number => {
  // This would typically come from an API
  const homeRecord = { wins: 8, draws: 2, losses: 1 };
  const awayRecord = { wins: 5, draws: 3, losses: 3 };

  const record = isHome ? homeRecord : awayRecord;
  const totalMatches = record.wins + record.draws + record.losses;
  
  return (record.wins * 3 + record.draws) / (totalMatches * 3);
};

// Calculate team strength with multiple factors
const calculateTeamStrength = (match: Match, isHome: boolean): number => {
  const team = isHome ? match.homeTeam : match.awayTeam;
  
  const formStrength = calculateTeamForm(team) * PREDICTION_FACTORS.FORM_WEIGHT;
  const headToHeadStrength = calculateHeadToHead(match.homeTeam, match.awayTeam) * PREDICTION_FACTORS.HEAD_TO_HEAD_WEIGHT;
  const leaguePositionStrength = calculateLeaguePositionImpact(5, 8) * PREDICTION_FACTORS.LEAGUE_POSITION_WEIGHT;
  const injuriesStrength = calculateInjuriesImpact(team) * PREDICTION_FACTORS.INJURIES_WEIGHT;
  const venueStrength = calculateVenueStrength(team, isHome) * PREDICTION_FACTORS.VENUE_WEIGHT;

  return formStrength + headToHeadStrength + leaguePositionStrength + injuriesStrength + venueStrength;
};

// Generate score prediction with Poisson distribution
const generateScorePrediction = (match: Match): { home: number; away: number } => {
  const homeStrength = calculateTeamStrength(match, true);
  const awayStrength = calculateTeamStrength(match, false);

  // Apply home advantage
  const adjustedHomeStrength = homeStrength + PREDICTION_FACTORS.HOME_ADVANTAGE;
  const adjustedAwayStrength = awayStrength;

  // Calculate expected goals using Poisson distribution
  const homeExpectedGoals = Math.max(0, adjustedHomeStrength * 2.5);
  const awayExpectedGoals = Math.max(0, adjustedAwayStrength * 2.5);

  // Generate most likely score
  const homeScore = Math.round(homeExpectedGoals);
  const awayScore = Math.round(awayExpectedGoals);

  return {
    home: homeScore,
    away: awayScore,
  };
};

// Calculate prediction confidence
const generateConfidence = (match: Match, prediction: { home: number; away: number }): number => {
  const homeStrength = calculateTeamStrength(match, true);
  const awayStrength = calculateTeamStrength(match, false);

  // Base confidence on strength difference
  const strengthDiff = Math.abs(homeStrength - awayStrength);
  
  // Higher confidence for more distinct strength differences
  const baseConfidence = Math.min(0.95, 0.5 + strengthDiff);

  // Adjust confidence based on prediction type
  let confidence = baseConfidence;
  
  if (prediction.home === prediction.away) {
    // Draw predictions are less confident
    confidence *= 0.9;
  } else if (Math.abs(prediction.home - prediction.away) > 2) {
    // High score difference predictions are less confident
    confidence *= 0.85;
  }

  return confidence;
};

// Generate detailed reasoning
const generateReasoning = (match: Match, prediction: { home: number; away: number }): string => {
  const homeStrength = calculateTeamStrength(match, true);
  const awayStrength = calculateTeamStrength(match, false);
  const homeForm = calculateTeamForm(match.homeTeam);
  const awayForm = calculateTeamForm(match.awayTeam);
  const headToHead = calculateHeadToHead(match.homeTeam, match.awayTeam);

  const reasons = [];

  // Add form analysis
  if (homeForm > 0.7) {
    reasons.push(`${match.homeTeam.name} is in excellent form`);
  } else if (homeForm < 0.3) {
    reasons.push(`${match.homeTeam.name} is struggling for form`);
  }

  if (awayForm > 0.7) {
    reasons.push(`${match.awayTeam.name} is in excellent form`);
  } else if (awayForm < 0.3) {
    reasons.push(`${match.awayTeam.name} is struggling for form`);
  }

  // Add head-to-head analysis
  if (headToHead > 0.7) {
    reasons.push(`${match.homeTeam.name} has a strong historical record against ${match.awayTeam.name}`);
  } else if (headToHead < 0.3) {
    reasons.push(`${match.awayTeam.name} has historically performed well against ${match.homeTeam.name}`);
  }

  // Add strength comparison
  if (homeStrength > awayStrength + 0.2) {
    reasons.push(`${match.homeTeam.name} appears significantly stronger than ${match.awayTeam.name}`);
  } else if (awayStrength > homeStrength + 0.2) {
    reasons.push(`${match.awayTeam.name} appears significantly stronger than ${match.homeTeam.name}`);
  }

  // Add venue analysis
  const homeVenue = calculateVenueStrength(match.homeTeam, true);
  if (homeVenue > 0.7) {
    reasons.push(`${match.homeTeam.name} has been very strong at home`);
  }

  // Combine reasons with prediction
  const reasonText = reasons.length > 0 
    ? reasons.join('. ') + '. '
    : 'Both teams appear evenly matched. ';

  return `${reasonText}Based on our analysis, we predict a ${prediction.home}-${prediction.away} result.`;
};

export const predictMatch = (match: Match): Prediction => {
  const scorePrediction = generateScorePrediction(match);
  const confidence = generateConfidence(match, scorePrediction);
  const reasoning = generateReasoning(match, scorePrediction);

  return {
    matchId: match.id,
    homeScore: scorePrediction.home,
    awayScore: scorePrediction.away,
    confidence,
    reasoning,
  };
}; 