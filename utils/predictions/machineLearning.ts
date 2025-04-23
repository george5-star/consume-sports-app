import { Match, Prediction } from './types';
import {
  calculateTeamForm,
  calculateHeadToHead,
  calculateLeaguePositionImpact,
  calculateInjuriesImpact,
  calculateVenueStrength,
  calculateWeatherImpact,
  calculateRefereeImpact,
  calculateTeamNewsImpact,
  calculateBettingMarketImpact
} from './calculations';

// Historical data structure
interface HistoricalData {
  matchId: string;
  features: {
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
  };
  actualResult: {
    homeScore: number;
    awayScore: number;
  };
}

// Model weights (would be trained in a real implementation)
const MODEL_WEIGHTS = {
  homeForm: 0.15,
  awayForm: 0.15,
  headToHead: 0.1,
  leaguePositionDiff: 0.1,
  injuries: 0.05,
  venueStrength: 0.1,
  weather: 0.05,
  referee: 0.05,
  teamNews: 0.1,
  bettingMarket: 0.15,
};

// Feature extraction
export const extractFeatures = (match: Match): HistoricalData['features'] => {
  return {
    homeForm: calculateTeamForm(match.homeTeam),
    awayForm: calculateTeamForm(match.awayTeam),
    headToHead: calculateHeadToHead(match.homeTeam, match.awayTeam),
    leaguePositionDiff: calculateLeaguePositionImpact(5, 8),
    injuries: calculateInjuriesImpact(match.homeTeam),
    venueStrength: calculateVenueStrength(match.homeTeam, true),
    weather: calculateWeatherImpact(match),
    referee: calculateRefereeImpact(match),
    teamNews: calculateTeamNewsImpact(match.homeTeam),
    bettingMarket: calculateBettingMarketImpact(match),
  };
};

// Model prediction
export const predictWithML = (features: HistoricalData['features']): Prediction => {
  // Calculate weighted sum of features
  const weightedSum = Object.entries(features).reduce((sum, [key, value]) => {
    return sum + (value * MODEL_WEIGHTS[key as keyof typeof MODEL_WEIGHTS]);
  }, 0);

  // Normalize to score prediction
  const homeScore = Math.round(weightedSum * 2.5);
  const awayScore = Math.round((1 - weightedSum) * 2.5);

  // Calculate confidence based on feature consistency
  const confidence = calculateMLConfidence(features);

  return {
    matchId: '', // Will be set by caller
    homeScore,
    awayScore,
    confidence,
    reasoning: generateMLReasoning(features),
  };
};

// Confidence calculation
const calculateMLConfidence = (features: HistoricalData['features']): number => {
  // Calculate feature variance
  const values = Object.values(features);
  const mean = values.reduce((a, b) => a + b) / values.length;
  const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;

  // Lower variance = higher confidence
  const baseConfidence = 1 - (variance * 2);
  return Math.max(0.5, Math.min(0.95, baseConfidence));
};

// Reasoning generation
const generateMLReasoning = (features: HistoricalData['features']): string => {
  const significantFactors = Object.entries(features)
    .filter(([_, value]) => Math.abs(value - 0.5) > 0.2)
    .sort((a, b) => Math.abs(b[1] - 0.5) - Math.abs(a[1] - 0.5));

  const reasons = significantFactors.map(([factor, value]) => {
    const impact = value > 0.5 ? 'positive' : 'negative';
    return `${factor} shows ${impact} impact`;
  });

  return reasons.length > 0
    ? `Our model indicates: ${reasons.join(', ')}.`
    : 'Our model shows balanced factors across all metrics.';
}; 