export interface TelegramMessage {
  id: number;
  message: string;
  date: string;
  channel: string;
  views?: number;
  forwards?: number;
} 