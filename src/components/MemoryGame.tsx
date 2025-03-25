import React, { useState, useEffect } from "react";
import Scoreboard from "./Scoreboard";
import GameBoard from "./GameBoard";

type Tile = {
    id: number;
    emoji: string;
    flipped: boolean;
    matched: boolean;
};

const emojis: string[] = ["🍎", "🍌", "🍇", "🍉", "🍒", "🍍", "🥝", "🍑", "🍏", "🍊", "🥥", "🍈", "🍋", "🍓", "🫐", "🥭"];
const levels: [number, number][] = [
    [2, 2],
    [3, 4],
    [4, 4],
    [4, 5],
    [8, 5]
];

const shuffleArray = (array: string[], rows: number, cols: number): Tile[] => {
    const totalTiles = rows * cols;
    const selectedEmojis = array.slice(0, totalTiles / 2);
    return [...selectedEmojis, ...selectedEmojis]
        .sort(() => Math.random() - 0.5)
        .map((emoji, index) => ({ id: index, emoji, flipped: false, matched: false }));
};

const MemoryGame: React.FC = () => {
    const [level, setLevel] = useState<number>(0);
    const [gridSize, setGridSize] = useState<[number, number]>(levels[level]);
    const [tiles, setTiles] = useState<Tile[]>(() => shuffleArray(emojis, gridSize[0], gridSize[1]));
    const [selectedTiles, setSelectedTiles] = useState<number[]>([]);
    const [matchedPairs, setMatchedPairs] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [highestScore, setHighestScore] = useState<number>(() => parseInt(localStorage.getItem("highestScore") || "0"));

    useEffect(() => {
        if (selectedTiles.length === 2) {
            const [first, second] = selectedTiles;
            if (tiles[first].emoji === tiles[second].emoji) {
                setTiles(prev => prev.map(tile => tile.id === first || tile.id === second ? { ...tile, matched: true } : tile));
                setMatchedPairs(prev => prev + 1);
                setScore(prev => prev + 10);
            } else {
                setTimeout(() => {
                    setTiles(prev => prev.map(tile => tile.id === first || tile.id === second ? { ...tile, flipped: false } : tile));
                }, 800);
                setScore(prev => (prev > 0 ? prev - 2 : 0));
            }
            setSelectedTiles([]);
        }
    }, [selectedTiles, tiles]);

    useEffect(() => {
        if (matchedPairs === (gridSize[0] * gridSize[1]) / 2) {
            if (score > highestScore) {
                setHighestScore(score);
                localStorage.setItem("highestScore", score.toString());
            }
            setTimeout(() => {
                if (level < levels.length - 1) {
                    const nextLevel = level + 1;
                    setLevel(nextLevel);
                    setGridSize(levels[nextLevel]);
                    setTiles(shuffleArray(emojis, levels[nextLevel][0], levels[nextLevel][1]));
                    setMatchedPairs(0);
                }
            }, 1000);
        }
    }, [matchedPairs, score, level, highestScore]);

    const handleTileClick = (index: number): void => {
        if (tiles[index].flipped || tiles[index].matched || selectedTiles.length === 2) return;
        setTiles(prev => prev.map(tile => tile.id === index ? { ...tile, flipped: true } : tile));
        setSelectedTiles([...selectedTiles, index]);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
            <Scoreboard score={score} highestScore={highestScore} />
            <h2 className="text-lg font-semibold mt-4">Level {level + 1}</h2>
            <GameBoard tiles={tiles} onTileClick={handleTileClick} gridSize={gridSize} />
            {matchedPairs === (gridSize[0] * gridSize[1]) / 2 && <p className="mt-4 text-xl">🎉 Level Complete! 🎉</p>}
        </div>
    );
};

export default MemoryGame;