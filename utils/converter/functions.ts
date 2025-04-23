import { BettingSite, ConversionRules } from './types';

// Sportybet conversions
const convertSportybetToBetway = (code: string) => `BW-${code}`;
const convertSportybetToBet9ja = (code: string) => `B9-${code}`;
const convertSportybetTo1xBet = (code: string) => `1X-${code}`;

// Betway conversions
const convertBetwayToSportybet = (code: string) => `SB-${code}`;
const convertBetwayToBet9ja = (code: string) => `B9-${code}`;
const convertBetwayTo1xBet = (code: string) => `1X-${code}`;

// Bet9ja conversions
const convertBet9jaToSportybet = (code: string) => `SB-${code}`;
const convertBet9jaToBetway = (code: string) => `BW-${code}`;
const convertBet9jaTo1xBet = (code: string) => `1X-${code}`;

// 1xBet conversions
const convert1xBetToSportybet = (code: string) => `SB-${code}`;
const convert1xBetToBetway = (code: string) => `BW-${code}`;
const convert1xBetToBet9ja = (code: string) => `B9-${code}`;

// Define conversion rules
export const conversionRules: ConversionRules = {
  sportybet: {
    betway: convertSportybetToBetway,
    bet9ja: convertSportybetToBet9ja,
    '1xbet': convertSportybetTo1xBet,
    sportybet: (code) => code,
  },
  betway: {
    sportybet: convertBetwayToSportybet,
    bet9ja: convertBetwayToBet9ja,
    '1xbet': convertBetwayTo1xBet,
    betway: (code) => code,
  },
  bet9ja: {
    sportybet: convertBet9jaToSportybet,
    betway: convertBet9jaToBetway,
    '1xbet': convertBet9jaTo1xBet,
    bet9ja: (code) => code,
  },
  '1xbet': {
    sportybet: convert1xBetToSportybet,
    betway: convert1xBetToBetway,
    bet9ja: convert1xBetToBet9ja,
    '1xbet': (code) => code,
  },
}; 