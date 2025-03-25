// TileComponent.tsx
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
    className="relative flex items-center justify-center cursor-pointer w-full aspect-square transition-transform hover:scale-105 duration-300 border-4 border-gray-500 rounded-2xl"
    onClick={onClick}
    whileTap={{ scale: 0.9 }}
  >
    <motion.div
      className="absolute w-full h-full rounded-2xl shadow-xl border-4 border-gray-600 bg-gray-900 flex items-center justify-center"
      animate={{ rotateY: tile.flipped || tile.matched ? 0 : 180 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {(tile.flipped || tile.matched) && (
        <span className="text-4xl font-bold text-white">{tile.emoji}</span>
      )}
    </motion.div>
  </motion.div>
);

export default TileComponent;