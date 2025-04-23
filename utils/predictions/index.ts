import { Match, PredictionError, PredictionResult } from './types';
import { predictMatch } from './functions';
import { validateMatch } from './validation';

/**
 * Generates a prediction for a given match
 * @param match - The match to predict
 * @returns Promise<PredictionResult> - The prediction result
 * @throws PredictionError - If validation fails or prediction error occurs
 */
export const generatePrediction = async (
  match: Match
): Promise<PredictionResult> => {
  // Validate input
  const validationError = validateMatch(match);
  if (validationError) {
    throw validationError;
  }

  try {
    // Generate prediction
    const prediction = predictMatch(match);

    // Return result
    return {
      match,
      prediction,
      timestamp: Date.now(),
    };
  } catch (error) {
    throw {
      message: 'Failed to generate prediction',
      code: 'PREDICTION_ERROR',
    } as PredictionError;
  }
};

// Re-export types and utilities
export * from './types';
export * from './functions';
export * from './validation'; 