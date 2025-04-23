// API Configuration
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.football-data.org/v4',
  headers: {
    'X-Auth-Token': process.env.NEXT_PUBLIC_API_KEY || '',
    'Content-Type': 'application/json',
  },
} as const;

// API Endpoints
export const ENDPOINTS = {
  competitions: '/competitions',
  matches: '/matches',
  teams: '/teams',
  standings: '/standings',
  areas: '/areas',
  players: '/players',
  coaches: '/coaches',
  competitionsMatches: (competitionId: string) => `/competitions/${competitionId}/matches`,
  teamMatches: (teamId: string) => `/teams/${teamId}/matches`,
  competitionStandings: (competitionId: string) => `/competitions/${competitionId}/standings`,
} as const;

// API Response Types
export type ApiResponse<T> = {
  data: T;
  message?: string;
  error?: string;
};

// API Error Types
export type ApiError = {
  message: string;
  status: number;
  code?: string;
}; 