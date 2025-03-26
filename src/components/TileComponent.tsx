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
    className="relative flex items-center justify-center cursor-pointer w-full aspect-square transition-transform hover:scale-110 duration-300 rounded-xl"
    onClick={onClick}
    whileTap={{ scale: 0.85 }}
  >
    {/* Tile Back */}
    <motion.div
      className={`absolute w-full h-full rounded-xl flex items-center justify-center bg-gray-700 shadow-lg border-2 border-gray-500 transition-all duration-300 ${
        tile.flipped || tile.matched ? "opacity-0" : "opacity-100"
      }`}
    />
    
    {/* Tile Front */}
    <motion.div
      className="absolute w-full h-full rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 shadow-2xl border-2 border-gray-300"
      animate={{ rotateY: tile.flipped || tile.matched ? 0 : 180 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {(tile.flipped || tile.matched) && (
        <span className="text-3xl font-extrabold text-white drop-shadow-md">
          {tile.emoji}
        </span>
      )}
    </motion.div>
  </motion.div>
);

export default TileComponent;