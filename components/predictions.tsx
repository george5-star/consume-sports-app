import React from "react";

const Predictions = () => {
  const matches = [
    { 
      league: "Premier League", 
      home: "Manchester City", 
      away: "Liverpool", 
      time: "15:00", 
      score: "2-1",
      prediction: "Home Win",
      confidence: "High",
      reasoning: "City's strong home form and Liverpool's recent defensive issues"
    },
    { 
      league: "La Liga", 
      home: "Real Madrid", 
      away: "Barcelona", 
      time: "20:00", 
      score: "3-2",
      prediction: "Home Win",
      confidence: "Medium",
      reasoning: "El Clásico is unpredictable, but Madrid has home advantage"
    },
    { 
      league: "Serie A", 
      home: "Juventus", 
      away: "AC Milan", 
      time: "18:00", 
      score: "1-1",
      prediction: "Draw",
      confidence: "Medium",
      reasoning: "Both teams in good form, likely to cancel each other out"
    },
    { 
      league: "Bundesliga", 
      home: "Bayern Munich", 
      away: "Dortmund", 
      time: "17:30", 
      score: "4-0",
      prediction: "Home Win",
      confidence: "High",
      reasoning: "Bayern's dominance at home and Dortmund's inconsistent away form"
    },
    { 
      league: "Ligue 1", 
      home: "PSG", 
      away: "Marseille", 
      time: "20:45", 
      score: "2-0",
      prediction: "Home Win",
      confidence: "High",
      reasoning: "PSG's superior squad depth and home advantage"
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-white">Predictions</h2>
      <div className="space-y-4">
        {matches.map((match, index) => (
          <div 
            key={index} 
            className="p-4 rounded-lg cursor-pointer text-white bg-white/5 hover:bg-black hover:text-white transition-colors duration-200"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-white/70">{match.league}</span>
              <span className="text-sm text-white/70">{match.time}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{match.home}</span>
              <span className="mx-2">vs</span>
              <span className="font-medium">{match.away}</span>
            </div>
            <div className="text-center mb-2">
              <span className="text-3xl font-bold text-amber-200 bg-black/20 px-4 py-1 rounded-lg">
                {match.score}
              </span>
            </div>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-white/70">Prediction:</span>
                <span className="font-medium">{match.prediction}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Confidence:</span>
                <span className={`font-medium ${
                  match.confidence === 'High' ? 'text-green-400' : 
                  match.confidence === 'Medium' ? 'text-amber-200' : 
                  'text-red-400'
                }`}>
                  {match.confidence}
                </span>
              </div>
              <div className="text-xs text-white/60 italic">
                {match.reasoning}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Predictions;
