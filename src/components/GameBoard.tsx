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
        className="grid gap-4 mt-6 w-full max-w-2xl" 
        style={{
            display: "grid",
            gridTemplateRows: `repeat(${gridSize[0]}, minmax(60px, 1fr))`,
            gridTemplateColumns: `repeat(${gridSize[1]}, minmax(60px, 1fr))`,
            justifyContent: "center"
        }}
    >
        {tiles.map((tile, index) => (
            <TileComponent key={tile.id} tile={tile} onClick={() => onTileClick(index)} />
        ))}
    </div>
);

export default GameBoard;
