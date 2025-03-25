// Scoreboard.tsx
import React from "react";

type ScoreboardProps = {
  score: number;
  highestScore: number;
};

const Scoreboard: React.FC<ScoreboardProps> = ({ score, highestScore }) => (
  <div className="w-full max-w-2xl bg-gray-800 text-white p-4 shadow-lg flex justify-between items-center border border-gray-700">
    <h1 className="text-xl font-bold text-green-400">🧠 Memory Game</h1>
    <div className="flex flex-col items-end">
      <p className="text-lg">Score: <span className="text-yellow-400">{score}</span></p>
      <p className="text-lg">Highest: <span className="text-blue-400">{highestScore}</span></p>
    </div>
  </div>
);

export default Scoreboard;