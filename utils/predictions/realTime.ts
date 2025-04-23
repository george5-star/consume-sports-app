import { Match, Prediction } from './types';

// Real-time data structure
interface RealTimeData {
  matchId: string;
  timestamp: number;
  events: {
    type: 'goal' | 'red_card' | 'injury' | 'substitution';
    team: 'home' | 'away';
    player: string;
    minute: number;
  }[];
  stats: {
    possession: {
      home: number;
      away: number;
    };
    shots: {
      home: number;
      away: number;
    };
    shotsOnTarget: {
      home: number;
      away: number;
    };
    corners: {
      home: number;
      away: number;
    };
  };
}

// Real-time impact weights
const REAL_TIME_WEIGHTS = {
  goal: 0.3,
  red_card: 0.2,
  injury: 0.15,
  substitution: 0.1,
  possession: 0.1,
  shots: 0.05,
  shotsOnTarget: 0.05,
  corners: 0.05,
};

// Update prediction based on real-time data
export const updatePrediction = (
  originalPrediction: Prediction,
  realTimeData: RealTimeData
): Prediction => {
  const impact = calculateRealTimeImpact(realTimeData);
  
  // Adjust scores based on impact
  const homeScore = Math.max(0, originalPrediction.homeScore + impact.home);
  const awayScore = Math.max(0, originalPrediction.awayScore + impact.away);
  
  // Adjust confidence based on data completeness
  const confidence = adjustConfidence(originalPrediction.confidence, realTimeData);
  
  return {
    ...originalPrediction,
    homeScore,
    awayScore,
    confidence,
    reasoning: generateRealTimeReasoning(originalPrediction.reasoning, realTimeData),
  };
};

// Calculate impact of real-time events
const calculateRealTimeImpact = (data: RealTimeData): { home: number; away: number } => {
  let homeImpact = 0;
  let awayImpact = 0;

  // Process events
  data.events.forEach(event => {
    const impact = REAL_TIME_WEIGHTS[event.type];
    if (event.team === 'home') {
      homeImpact += event.type === 'goal' ? 1 : -impact;
      awayImpact += event.type === 'goal' ? -impact : impact;
    } else {
      awayImpact += event.type === 'goal' ? 1 : -impact;
      homeImpact += event.type === 'goal' ? -impact : impact;
    }
  });

  // Process stats
  const possessionDiff = (data.stats.possession.home - data.stats.possession.away) / 100;
  const shotsDiff = (data.stats.shots.home - data.stats.shots.away) / 20;
  const shotsOnTargetDiff = (data.stats.shotsOnTarget.home - data.stats.shotsOnTarget.away) / 10;
  const cornersDiff = (data.stats.corners.home - data.stats.corners.away) / 10;

  homeImpact += possessionDiff * REAL_TIME_WEIGHTS.possession;
  homeImpact += shotsDiff * REAL_TIME_WEIGHTS.shots;
  homeImpact += shotsOnTargetDiff * REAL_TIME_WEIGHTS.shotsOnTarget;
  homeImpact += cornersDiff * REAL_TIME_WEIGHTS.corners;

  awayImpact -= possessionDiff * REAL_TIME_WEIGHTS.possession;
  awayImpact -= shotsDiff * REAL_TIME_WEIGHTS.shots;
  awayImpact -= shotsOnTargetDiff * REAL_TIME_WEIGHTS.shotsOnTarget;
  awayImpact -= cornersDiff * REAL_TIME_WEIGHTS.corners;

  return {
    home: homeImpact,
    away: awayImpact,
  };
};

// Adjust confidence based on data completeness
const adjustConfidence = (originalConfidence: number, data: RealTimeData): number => {
  const timeElapsed = data.timestamp - Date.now();
  const completeness = Math.min(1, timeElapsed / (90 * 60 * 1000)); // 90 minutes in milliseconds
  
  // More data = higher confidence
  const dataCompleteness = Math.min(1, 
    (data.events.length / 10) + // Events completeness
    (Object.values(data.stats).filter(Boolean).length / 4) // Stats completeness
  );
  
  return Math.min(0.95, originalConfidence * (0.7 + (completeness * 0.3)) * (0.7 + (dataCompleteness * 0.3)));
};

// Generate updated reasoning
const generateRealTimeReasoning = (originalReasoning: string, data: RealTimeData): string => {
  const significantEvents = data.events.filter(event => 
    event.type === 'goal' || event.type === 'red_card'
  );
  
  const significantStats = Object.entries(data.stats)
    .filter(([_, value]) => Math.abs(value.home - value.away) > 5)
    .map(([stat, value]) => `${stat}: ${value.home}-${value.away}`);
  
  const eventSummary = significantEvents.length > 0
    ? `Recent events: ${significantEvents.map(e => `${e.type} (${e.minute}')`).join(', ')}. `
    : '';
    
  const statsSummary = significantStats.length > 0
    ? `Current stats: ${significantStats.join(', ')}. `
    : '';
    
  return `${originalReasoning} ${eventSummary}${statsSummary}`.trim();
}; 