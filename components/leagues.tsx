import React from "react";
import { LeagueService } from "../services/leagueService";

const Leagues = () => {
  const leagues = LeagueService.getAllLeagues();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-white">Leagues</h2>
      <div className="space-y-2">
        {leagues.map((league) => (
          <div 
            key={league.id} 
            className="p-3 rounded-lg cursor-pointer text-white bg-white/5 hover:bg-amber-200 hover:text-black transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <img 
                src={league.logo} 
                alt={`${league.name} logo`} 
                className="w-8 h-8 object-contain"
              />
              <div>
                <div className="font-medium">{league.name}</div>
                <div className="text-xs text-white/70">{league.country}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leagues;
