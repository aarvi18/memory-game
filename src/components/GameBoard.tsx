import React from "react";
import TileComponent from "./TileComponent";

type GameBoardProps = {
  tiles: Tile[];
  onTileClick: (index: number) => void;
  gridSize: [number, number];
};

type Tile = {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
};

const GameBoard: React.FC<GameBoardProps> = ({ tiles, onTileClick, gridSize }) => (
  <div
    className="p-6 rounded-3xl shadow-2xl border-2 border-gray-300 bg-gradient-to-br from-indigo-800 to-purple-600 relative overflow-hidden"
  >
    {/* Glow Effect */}
    <div className="absolute inset-0 bg-white opacity-10 blur-3xl" />
    <div
      className={`grid gap-3 transition-all duration-300 ease-in-out`}
      style={{
        gridTemplateRows: `repeat(${gridSize[0]}, minmax(60px, 1fr))`,
        gridTemplateColumns: `repeat(${gridSize[1]}, minmax(60px, 1fr))`,
      }}
    >
      {tiles.map((tile, index) => (
        <TileComponent
          key={tile.id}
          tile={tile}
          onClick={() => onTileClick(index)}
        />
      ))}
    </div>
  </div>
);

export default GameBoard;