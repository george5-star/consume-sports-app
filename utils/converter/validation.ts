import { BettingSite, ConverterError } from './types';

export const validateCode = (code: string, site: BettingSite): ConverterError | null => {
  if (!code.trim()) {
    return {
      message: 'Please enter a betting code',
      code: 'EMPTY_CODE',
    };
  }

  // Add site-specific validation rules
  switch (site) {
    case 'sportybet':
      if (!code.match(/^[A-Z0-9]{6,}$/)) {
        return {
          message: 'Invalid Sportybet code format',
          code: 'INVALID_FORMAT',
        };
      }
      break;
    case 'betway':
      if (!code.match(/^[A-Z0-9]{8,}$/)) {
        return {
          message: 'Invalid Betway code format',
          code: 'INVALID_FORMAT',
        };
      }
      break;
    case 'bet9ja':
      if (!code.match(/^[A-Z0-9]{7,}$/)) {
        return {
          message: 'Invalid Bet9ja code format',
          code: 'INVALID_FORMAT',
        };
      }
      break;
    case '1xbet':
      if (!code.match(/^[A-Z0-9]{9,}$/)) {
        return {
          message: 'Invalid 1xBet code format',
          code: 'INVALID_FORMAT',
        };
      }
      break;
  }

  return null;
}; 