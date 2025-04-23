'use client'
import React, { useState } from "react";
import DatePicker from "./DatePicker";

const Fixtures = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    // Here you would typically fetch fixtures for the selected date
    // For now, we'll just update the state
  };

  const matches = [
    { 
      league: "Premier League", 
      home: "Manchester City", 
      away: "Liverpool", 
      time: "15:00",
      date: "Today",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png"
    },
    { 
      league: "La Liga", 
      home: "Real Madrid", 
      away: "Barcelona", 
      time: "20:00",
      date: "Today",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png"
    },
    { 
      league: "Serie A", 
      home: "Juventus", 
      away: "AC Milan", 
      time: "18:00",
      date: "Today",
      homeLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Juventus_FC_2017_icon.svg/1200px-Juventus_FC_2017_icon.svg.png",
      awayLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/AC_Milan_logo.svg/1200px-AC_Milan_logo.svg.png"
    },
    { 
      league: "Bundesliga", 
      home: "Bayern Munich", 
      away: "Dortmund", 
      time: "17:30",
      date: "Today",
      homeLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/1200px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png",
      awayLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/1200px-Borussia_Dortmund_logo.svg.png"
    },
    { 
      league: "Ligue 1", 
      home: "PSG", 
      away: "Marseille", 
      time: "20:45",
      date: "Today",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Paris_Saint-Germain_F.C..svg/1200px-Paris_Saint-Germain_F.C..svg.png",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/Olympique_de_Marseille_logo.svg/1200px-Olympique_de_Marseille_logo.svg.png"
    },
    { 
      league: "Premier League", 
      home: "Arsenal", 
      away: "Chelsea", 
      time: "16:30",
      date: "Today",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png"
    },
    { 
      league: "La Liga", 
      home: "Atletico Madrid", 
      away: "Sevilla", 
      time: "21:00",
      date: "Today",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Atletico_Madrid_2017_logo.svg/1200px-Atletico_Madrid_2017_logo.svg.png",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/Sevilla_FC_logo.svg/1200px-Sevilla_FC_logo.svg.png"
    },
    { 
      league: "Serie A", 
      home: "Inter Milan", 
      away: "Napoli", 
      time: "19:45",
      date: "Today",
      homeLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/1200px-FC_Internazionale_Milano_2021.svg.png",
      awayLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/SSC_Napoli_%282016%29.svg/1200px-SSC_Napoli_%282016%29.svg.png"
    },
    { 
      league: "Bundesliga", 
      home: "RB Leipzig", 
      away: "Bayer Leverkusen", 
      time: "18:30",
      date: "Today",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/RB_Leipzig_2014_logo.svg/1200px-RB_Leipzig_2014_logo.svg.png",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/59/Bayer_04_Leverkusen_logo.svg/1200px-Bayer_04_Leverkusen_logo.svg.png"
    },
    { 
      league: "Ligue 1", 
      home: "Lyon", 
      away: "Monaco", 
      time: "20:00",
      date: "Today",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Olympique_Lyonnais.svg/1200px-Olympique_Lyonnais.svg.png",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/20/AS_Monaco_FC.svg/1200px-AS_Monaco_FC.svg.png"
    },
    { 
      league: "Premier League", 
      home: "Manchester United", 
      away: "Tottenham", 
      time: "17:00",
      date: "Tomorrow",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Tottenham_Hotspur.svg/1200px-Tottenham_Hotspur.svg.png"
    },
    { 
      league: "La Liga", 
      home: "Valencia", 
      away: "Real Sociedad", 
      time: "19:30",
      date: "Tomorrow",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/Valencia_CF.svg/1200px-Valencia_CF.svg.png",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/Real_Sociedad_logo.svg/1200px-Real_Sociedad_logo.svg.png"
    },
    { 
      league: "Serie A", 
      home: "Roma", 
      away: "Lazio", 
      time: "20:45",
      date: "Tomorrow",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/AS_Roma_logo_%282017%29.svg/1200px-AS_Roma_logo_%282017%29.svg.png",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/35/SS_Lazio_badge.svg/1200px-SS_Lazio_badge.svg.png"
    },
    { 
      league: "Bundesliga", 
      home: "Wolfsburg", 
      away: "Eintracht Frankfurt", 
      time: "15:30",
      date: "Tomorrow",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/VfL_Wolfsburg_logo.svg/1200px-VfL_Wolfsburg_logo.svg.png",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Eintracht_Frankfurt_logo.svg/1200px-Eintracht_Frankfurt_logo.svg.png"
    },
    { 
      league: "Ligue 1", 
      home: "Lille", 
      away: "Nice", 
      time: "20:00",
      date: "Tomorrow",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Lille_OSC_2018_logo.svg/1200px-Lille_OSC_2018_logo.svg.png",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/OGC_Nice_logo.svg/1200px-OGC_Nice_logo.svg.png"
    },
    { 
      league: "Premier League", 
      home: "Newcastle", 
      away: "Aston Villa", 
      time: "15:00",
      date: "Tomorrow",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Newcastle_United_Logo.svg/1200px-Newcastle_United_Logo.svg.png",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Aston_Villa_logo.svg/1200px-Aston_Villa_logo.svg.png"
    },
    { 
      league: "La Liga", 
      home: "Real Betis", 
      away: "Villarreal", 
      time: "18:30",
      date: "Tomorrow",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Real_Betis_logo.svg/1200px-Real_Betis_logo.svg.png",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Villarreal_CF_logo.svg/1200px-Villarreal_CF_logo.svg.png"
    },
    { 
      league: "Serie A", 
      home: "Fiorentina", 
      away: "Atalanta", 
      time: "19:45",
      date: "Tomorrow",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/ACF_Fiorentina_logo.svg/1200px-ACF_Fiorentina_logo.svg.png",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/Atalanta_BC_logo.svg/1200px-Atalanta_BC_logo.svg.png"
    },
    { 
      league: "Bundesliga", 
      home: "Hoffenheim", 
      away: "Freiburg", 
      time: "15:30",
      date: "Tomorrow",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0d/TSG_Hoffenheim_logo.svg/1200px-TSG_Hoffenheim_logo.svg.png",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/SC_Freiburg_logo.svg/1200px-SC_Freiburg_logo.svg.png"
    }
  ];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-white">Top Fixtures</h2>
        <DatePicker onDateChange={handleDateChange} />
      </div>
      <div className="space-y-2">
        {matches.map((match, index) => (
          <div 
            key={index} 
            className="p-3 rounded-lg cursor-pointer text-white bg-white/5 hover:bg-black hover:text-white transition-colors duration-200"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-white/70 w-full">{match.league}</span>
              <div className="flex items-center space-x-2 ml-4">
                <span className="text-xs text-white/70">{match.date}</span>
                <span className="text-xs text-white/70">{match.time}</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm max-w-md mx-auto">
              <div className="flex items-center space-x-2 w-1/3 justify-end">
                <span className="font-medium text-right">{match.home}</span>
                <img 
                  src={match.homeLogo} 
                  alt={`${match.home} logo`} 
                  className="w-6 h-6 object-contain"
                />
              </div>
              <span className="mx-2 text-xs">vs</span>
              <div className="flex items-center space-x-2 w-1/3">
                <img 
                  src={match.awayLogo} 
                  alt={`${match.away} logo`} 
                  className="w-6 h-6 object-contain"
                />
                <span className="font-medium">{match.away}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fixtures;
