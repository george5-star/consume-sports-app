import React from "react";
import Predictions from "../../../components/predictions";
import { Match, Prediction, Team } from '../../../utils/predictions/types';
import { predictWithML } from '../../../utils/predictions/machineLearning';
import { updatePrediction } from '../../../utils/predictions/realTime';

// Helper function to create a Team object
const createTeam = (id: string, name: string, logo: string): Team => ({
  id,
  name,
  logo,
});

// Sample match data
const matches: Match[] = [
  {
    id: '1',
    league: {
      id: '1',
      name: 'Premier League',
      country: 'England',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/1200px-Premier_League_Logo.svg.png',
      type: 'league',
    },
    homeTeam: createTeam('1', 'Manchester City', 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC.svg/1200px-Manchester_City_FC.svg.png'),
    awayTeam: createTeam('2', 'Liverpool', 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png'),
    date: '2024-04-25',
    time: '20:00',
    homeLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC.svg/1200px-Manchester_City_FC.svg.png',
    awayLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png',
  },
  {
    id: '2',
    league: {
      id: '2',
      name: 'La Liga',
      country: 'Spain',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/LaLiga.svg/1200px-LaLiga.svg.png',
      type: 'league',
    },
    homeTeam: createTeam('3', 'Real Madrid', 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png'),
    awayTeam: createTeam('4', 'Barcelona', 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/FC_Barcelona_logo.svg/1200px-FC_Barcelona_logo.svg.png'),
    date: '2024-04-26',
    time: '21:00',
    homeLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png',
    awayLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/FC_Barcelona_logo.svg/1200px-FC_Barcelona_logo.svg.png',
  },
];

const PredictionsPage = () => {
  // Generate predictions for each match
  const predictions = matches.map(match => {
    // Create features object for ML prediction
    const features = {
      homeForm: 0.8,
      awayForm: 0.7,
      headToHead: 0.6,
      leaguePositionDiff: 0.5,
      injuries: 0.9,
      venueStrength: 0.8,
      weather: 0.9,
      referee: 0.7,
      teamNews: 0.8,
      bettingMarket: 0.75,
    };

    const initialPrediction = predictWithML(features);
    initialPrediction.matchId = match.id;

    // In a real app, we would get real-time data from an API
    const realTimeData = {
      matchId: match.id,
      timestamp: Date.now(),
      events: [],
      stats: {
        possession: { home: 55, away: 45 },
        shots: { home: 12, away: 8 },
        shotsOnTarget: { home: 5, away: 3 },
        corners: { home: 6, away: 4 },
      },
    };
    return updatePrediction(initialPrediction, realTimeData);
  });

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Match Predictions</h1>
          <div className="space-y-6">
            {predictions.map((prediction, index) => (
              <div key={prediction.matchId} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <img 
                      src={matches[index].league.logo} 
                      alt={matches[index].league.name}
                      className="w-6 h-6"
                    />
                    <span className="text-gray-400 text-sm">
                      {matches[index].league.name}
                    </span>
                  </div>
                  <div className="text-gray-500 text-sm">
                    {matches[index].date} at {matches[index].time}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={matches[index].homeLogo} 
                      alt={matches[index].homeTeam.name}
                      className="w-8 h-8"
                    />
                    <span className="text-white font-medium">{matches[index].homeTeam.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-bold text-white">{prediction.homeScore}</span>
                    <span className="text-gray-400">vs</span>
                    <span className="text-2xl font-bold text-white">{prediction.awayScore}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-white font-medium">{matches[index].awayTeam.name}</span>
                    <img 
                      src={matches[index].awayLogo} 
                      alt={matches[index].awayTeam.name}
                      className="w-8 h-8"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400 text-sm">
                      Confidence: {(prediction.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="text-gray-300 text-sm">
                    {prediction.reasoning}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionsPage; 