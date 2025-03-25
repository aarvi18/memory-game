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
            className="absolute w-full h-full rounded-2xl shadow-xl border-4 border-gray-600"
            initial={false}
            animate={{ rotateY: tile.flipped || tile.matched ? 0 : 180 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
                backfaceVisibility: "hidden",
                transformStyle: "preserve-3d",
                boxShadow: tile.flipped ? "0px 0px 15px rgba(255, 255, 255, 0.3)" : "none",
            }}
        >
            {tile.flipped || tile.matched ? (
                <motion.span
                    className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-white drop-shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {tile.emoji}
                </motion.span>
            ) : (
                <motion.div
                    className="absolute inset-0 bg-gray-900 rounded-2xl flex items-center justify-center shadow-md border-4 border-gray-700"
                    whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.3)" }}
                />
            )}
        </motion.div>
    </motion.div>
);

export default TileComponent;