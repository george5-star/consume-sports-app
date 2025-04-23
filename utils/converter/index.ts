import { BettingSite, ConverterError, ConverterResult } from './types';
import { conversionRules } from './functions';
import { validateCode } from './validation';

/**
 * Converts a betting code from one platform to another
 * @param code - The original betting code
 * @param fromSite - The source betting platform
 * @param toSite - The target betting platform
 * @returns Promise<ConverterResult> - The conversion result
 * @throws ConverterError - If validation fails or conversion error occurs
 */
export const convertCode = async (
  code: string,
  fromSite: BettingSite,
  toSite: BettingSite
): Promise<ConverterResult> => {
  // Validate input
  const validationError = validateCode(code, fromSite);
  if (validationError) {
    throw validationError;
  }

  try {
    // Perform conversion
    const convertedCode = conversionRules[fromSite][toSite](code);

    // Return result
    return {
      originalCode: code,
      convertedCode,
      fromSite,
      toSite,
      timestamp: Date.now(),
    };
  } catch (error) {
    throw {
      message: 'Failed to convert code',
      code: 'CONVERSION_ERROR',
    } as ConverterError;
  }
};

// Re-export types and utilities
export * from './types';
export * from './functions';
export * from './validation'; 