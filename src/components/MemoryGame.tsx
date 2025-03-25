import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const emojis = ["🍎", "🍌", "🍇", "🍉", "🍒", "🍍", "🥝", "🍑", "🍏"];

// Shuffle function
const shuffleArray = (array: string[]) => {
    return [...array, ...array]
        .sort(() => Math.random() - 0.5)
        .slice(0, 9)
        .map((emoji, index) => ({ id: index, emoji, flipped: false, matched: false }));
};

const MemoryGame: React.FC = () => {
    const [tiles, setTiles] = useState(() => shuffleArray(emojis));
    const [selectedTiles, setSelectedTiles] = useState<number[]>([]);
    const [matchedPairs, setMatchedPairs] = useState(0);

    useEffect(() => {
        if (selectedTiles.length === 2) {
            const [first, second] = selectedTiles;
            if (tiles[first].emoji === tiles[second].emoji) {
                setTiles(prev => prev.map(tile => tile.id === first || tile.id === second ? { ...tile, matched: true } : tile));
                setMatchedPairs(prev => prev + 1);
            } else {
                setTimeout(() => {
                    setTiles(prev => prev.map(tile => tile.id === first || tile.id === second ? { ...tile, flipped: false } : tile));
                }, 800);
            }
            setSelectedTiles([]);
        }
    }, [selectedTiles, tiles]);

    const handleTileClick = (index: number) => {
        if (tiles[index].flipped || tiles[index].matched || selectedTiles.length === 2) return;
        setTiles(prev => prev.map(tile => tile.id === index ? { ...tile, flipped: true } : tile));
        setSelectedTiles([...selectedTiles, index]);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
            <h1 className="text-3xl font-bold mb-6">Memory Game</h1>
            <div className="grid grid-cols-3 gap-4">
                {tiles.map((tile, index) => (
                    <motion.div
                        key={tile.id}
                        className="w-20 h-20 flex items-center justify-center bg-gray-700 rounded-xl shadow-lg cursor-pointer"
                        onClick={() => handleTileClick(index)}
                        whileTap={{ scale: 0.9 }}
                    >
                        {tile.flipped || tile.matched ? (
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl">
                                {tile.emoji}
                            </motion.span>
                        ) : (
                            <motion.div className="w-full h-full bg-gray-800 rounded-xl"></motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
            {matchedPairs === emojis.length && <p className="mt-4 text-xl">🎉 You Won! 🎉</p>}
        </div>
    );
};

export default MemoryGame;
