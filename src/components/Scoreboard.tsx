import React from "react";

type ScoreboardProps = {
    score: number;
    highestScore: number;
};

const Scoreboard: React.FC<ScoreboardProps> = ({ score, highestScore }) => (
    <div className="w-full flex justify-between items-center px-6">
        <h1 className="text-3xl font-bold">Memory Game</h1>
        <p className="text-xl font-bold">Score: {score} | Highest Score: {highestScore}</p>
    </div>
);

export default Scoreboard;
