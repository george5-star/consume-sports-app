export type BettingSite = 'sportybet' | 'betway' | 'bet9ja' | '1xbet';

export type ConversionRules = Record<BettingSite, Record<BettingSite, (code: string) => string>>;

export interface ConverterError {
  message: string;
  code?: string;
}

export interface ConverterResult {
  originalCode: string;
  convertedCode: string;
  fromSite: BettingSite;
  toSite: BettingSite;
  timestamp: number;
} 