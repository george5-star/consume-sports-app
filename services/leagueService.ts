import { League } from "../types/leagues";
import { DOMESTIC_LEAGUES, EUROPEAN_LEAGUES } from "../constants/leagues";

export class LeagueService {
  static getAllLeagues(): League[] {
    return [...EUROPEAN_LEAGUES, ...DOMESTIC_LEAGUES];
  }

  static getEuropeanLeagues(): League[] {
    return EUROPEAN_LEAGUES;
  }

  static getDomesticLeagues(): League[] {
    return DOMESTIC_LEAGUES;
  }

  static getLeagueById(id: string): League | undefined {
    return this.getAllLeagues().find(league => league.id === id);
  }
} 