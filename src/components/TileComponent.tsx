import React from "react";
import { motion } from "framer-motion";

type TileProps = {
    tile: Tile;
    onClick: () => void;
};

type Tile = {
    id: number;
    emoji: string;
    flipped: boolean;
    matched: boolean;
};

const TileComponent: React.FC<TileProps> = ({ tile, onClick }) => (
    <motion.div
        className="flex items-center justify-center bg-gray-700 rounded-xl shadow-lg cursor-pointer"
        style={{ width: "100%", aspectRatio: "1 / 1" }}
        onClick={onClick}
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
);

export default TileComponent;
