// GameBoard.tsx
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
  <div className="grid gap-2 p-4 bg-gradient-to-br from-blue-900 to-purple-800 rounded-2xl shadow-2xl border border-gray-300"
       style={{
         gridTemplateRows: `repeat(${gridSize[0]}, minmax(50px, 1fr))`,
         gridTemplateColumns: `repeat(${gridSize[1]}, minmax(50px, 1fr))`,
       }}>
    {tiles.map((tile, index) => (
      <TileComponent key={tile.id} tile={tile} onClick={() => onTileClick(index)} />
    ))}
  </div>
);

export default GameBoard;