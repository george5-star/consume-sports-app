"use client"
import React, { useState } from "react";
import { BettingSite, ConverterError } from "../utils/converter/types";
import { convertCode } from "../utils/converter";

const Converter = () => {
  const [fromSite, setFromSite] = useState<BettingSite>('sportybet');
  const [toSite, setToSite] = useState<BettingSite>('betway');
  const [code, setCode] = useState('');
  const [convertedCode, setConvertedCode] = useState('');
  const [error, setError] = useState<ConverterError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleConvert = async () => {
    // Reset states
    setError(null);
    setConvertedCode('');
    setIsLoading(true);

    try {
      const result = await convertCode(code, fromSite, toSite);
      setConvertedCode(result.convertedCode);
    } catch (err) {
      setError(err as ConverterError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-white">Converter</h2>
      <div className="bg-white/10 p-6 rounded-lg">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">From Betting Site</label>
            <select 
              value={fromSite}
              onChange={(e) => setFromSite(e.target.value as BettingSite)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:ring-2 focus:ring-amber-200 focus:border-amber-200"
            >
              <option value="sportybet" className="bg-gray-800">Sportybet</option>
              <option value="betway" className="bg-gray-800">Betway</option>
              <option value="bet9ja" className="bg-gray-800">Bet9ja</option>
              <option value="1xbet" className="bg-gray-800">1xBet</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">To Betting Site</label>
            <select 
              value={toSite}
              onChange={(e) => setToSite(e.target.value as BettingSite)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:ring-2 focus:ring-amber-200 focus:border-amber-200"
            >
              <option value="sportybet" className="bg-gray-800">Sportybet</option>
              <option value="betway" className="bg-gray-800">Betway</option>
              <option value="bet9ja" className="bg-gray-800">Bet9ja</option>
              <option value="1xbet" className="bg-gray-800">1xBet</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Enter Code</label>
            <input 
              type="text" 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:ring-2 focus:ring-amber-200 focus:border-amber-200" 
              placeholder="Enter betting code"
            />
          </div>
          <button 
            onClick={handleConvert}
            disabled={isLoading}
            className={`w-full bg-amber-200 text-black py-3 rounded-lg font-medium transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-amber-300 cursor-pointer'
            }`}
          >
            {isLoading ? 'Converting...' : 'Convert'}
          </button>
          
          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error.message}</p>
            </div>
          )}
          
          {/* Result Section */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <label className="block text-sm font-medium text-white mb-2">Converted Code</label>
            <div className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white">
              {isLoading ? (
                <p className="text-center text-white/70">Converting...</p>
              ) : convertedCode ? (
                <p className="text-center font-mono">{convertedCode}</p>
              ) : (
                <p className="text-center text-white/70">Your converted code will appear here</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Converter;
