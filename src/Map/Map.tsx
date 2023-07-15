import { useState } from "react";
import Board from "./Board/Board";
import Bar from "./Bar/Bar";
import Controls from "./Controls/Controls";
import config from "./config.json";

import "./Map.scss";

interface MapProps {
  darkMode: boolean;
  theme: string;
  seed: string;
}

export default function Map({ darkMode, theme, seed }: MapProps) {

  // Ensures that the player does not spawn on the edge of the map
  const walkableSpace = config.board.dimensions - config.board.subdimensions;

  // (Purely) randomizes the player's starting position
  // So that the player does not start in the same place every time

  const [position, setPosition] = useState([
    Math.floor(Math.random() * walkableSpace),
    Math.floor(Math.random() * walkableSpace),
  ]);

  const [moves, setMoves] = useState(config.board.initialMoves);

  function move(x_change: number, y_change: number) {
    // Moves can only be in four directions: up, down, left, right
    // Moves can only be made if the player has moves left and
    // Moves are not continued or used if the player would move off the map

    const row = position[0] + y_change;
    const col = position[1] + x_change;

    if (
      0 <= row &&
      row < config.board.dimensions - config.board.subdimensions &&
      0 <= col &&
      col < config.board.dimensions - config.board.subdimensions
    ) {
      setPosition([row, col]);
      setMoves(moves - 1);
    }
  }

  // Styling for background and components based on dark/light mode
  const style = darkMode
  ? { backgroundColor: "black", color: "white" }
  : { backgroundColor: "white", color: "black" };

  return (
    <div className="Map">
      {moves > 0 ? (
        <div>
          <Board config={config} theme={theme} seed={seed} position={position}/>
          <Bar darkMode={darkMode} moves={moves} />
          <Controls darkMode={darkMode} move={move} />
        </div>
      ) : (
        <div className="GameOver" >
            <h1 style={style}>San?</h1>
            <h2 style={style}>{`(${position[0]}, ${position[0]})`}</h2>
        </div>
      )}
    </div>
  );
}
