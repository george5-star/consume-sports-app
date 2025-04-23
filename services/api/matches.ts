import { apiClient } from '@/lib/api/client';
import { ENDPOINTS } from '@/lib/api/config';
import { Match } from '@/types/leagues';

export class MatchesApi {
  static async getMatchesByCompetition(competitionId: string): Promise<Match[]> {
    try {
      const response = await apiClient.get<{ matches: any[] }>(
        `${ENDPOINTS.competitions}/${competitionId}/matches`
      );
      
      return response.matches.map(match => ({
        id: match.id.toString(),
        league: {
          id: match.competition.id.toString(),
          name: match.competition.name,
          country: match.competition.area.name,
          logo: match.competition.emblem,
          type: match.competition.type === 'CUP' ? 'european' : 'domestic'
        },
        homeTeam: match.homeTeam.name,
        awayTeam: match.awayTeam.name,
        date: match.utcDate.split('T')[0],
        time: match.utcDate.split('T')[1].split(':').slice(0, 2).join(':'),
        homeLogo: match.homeTeam.crest,
        awayLogo: match.awayTeam.crest
      }));
    } catch (error) {
      console.error(`Error fetching matches for competition ${competitionId}:`, error);
      return [];
    }
  }

  static async getMatchById(matchId: string): Promise<Match | null> {
    try {
      const response = await apiClient.get<any>(`${ENDPOINTS.matches}/${matchId}`);
      return {
        id: response.id.toString(),
        league: {
          id: response.competition.id.toString(),
          name: response.competition.name,
          country: response.competition.area.name,
          logo: response.competition.emblem,
          type: response.competition.type === 'CUP' ? 'european' : 'domestic'
        },
        homeTeam: response.homeTeam.name,
        awayTeam: response.awayTeam.name,
        date: response.utcDate.split('T')[0],
        time: response.utcDate.split('T')[1].split(':').slice(0, 2).join(':'),
        homeLogo: response.homeTeam.crest,
        awayLogo: response.awayTeam.crest
      };
    } catch (error) {
      console.error(`Error fetching match ${matchId}:`, error);
      return null;
    }
  }
} 