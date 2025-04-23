import { League } from '../types/leagues';

export const EUROPEAN_LEAGUES: League[] = [
  {
    id: 'ucl',
    name: 'UEFA Champions League',
    country: 'Europe',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/UEFA_Champions_League_logo.svg/1200px-UEFA_Champions_League_logo.svg.png',
    type: 'european'
  },
  {
    id: 'uel',
    name: 'UEFA Europa League',
    country: 'Europe',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/90/UEFA_Europa_League_logo.svg/1200px-UEFA_Europa_League_logo.svg.png',
    type: 'european'
  },
  {
    id: 'uecl',
    name: 'UEFA Europa Conference League',
    country: 'Europe',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/UEFA_Europa_Conference_League_logo.svg/1200px-UEFA_Europa_Conference_League_logo.svg.png',
    type: 'european'
  }
];

export const DOMESTIC_LEAGUES: League[] = [
  {
    id: 'pl',
    name: 'Premier League',
    country: 'England',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/1200px-Premier_League_Logo.svg.png',
    type: 'domestic'
  },
  {
    id: 'laliga',
    name: 'La Liga',
    country: 'Spain',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/LaLiga.svg/1200px-LaLiga.svg.png',
    type: 'domestic'
  },
  {
    id: 'seriea',
    name: 'Serie A',
    country: 'Italy',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Serie_A_logo_2022.svg/1200px-Serie_A_logo_2022.svg.png',
    type: 'domestic'
  },
  {
    id: 'bundesliga',
    name: 'Bundesliga',
    country: 'Germany',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Bundesliga_logo_%282017%29.svg/1200px-Bundesliga_logo_%282017%29.svg.png',
    type: 'domestic'
  },
  {
    id: 'ligue1',
    name: 'Ligue 1',
    country: 'France',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Ligue_1_Uber_Eats_logo.svg/1200px-Ligue_1_Uber_Eats_logo.svg.png',
    type: 'domestic'
  }
]; 