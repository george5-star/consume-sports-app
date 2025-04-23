import { Match, PredictionError } from './types';

export const validateMatch = (match: Match): PredictionError | null => {
  if (!match.id) {
    return {
      message: 'Match ID is required',
      code: 'INVALID_MATCH_ID',
    };
  }

  if (!match.homeTeam || !match.awayTeam) {
    return {
      message: 'Both home and away teams are required',
      code: 'INVALID_TEAMS',
    };
  }

  if (!match.date || !match.time) {
    return {
      message: 'Match date and time are required',
      code: 'INVALID_DATE_TIME',
    };
  }

  // Check if match is in the future
  const matchDateTime = new Date(`${match.date}T${match.time}`);
  if (matchDateTime < new Date()) {
    return {
      message: 'Cannot predict past matches',
      code: 'PAST_MATCH',
    };
  }

  return null;
}; 