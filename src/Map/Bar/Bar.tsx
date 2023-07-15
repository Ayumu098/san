import BarBit from "./BarBit";
import config from "../config.json";

import "./Bar.scss";

interface BarProps {
  moves: number;
}

export default function Bar({ moves }: BarProps) {
  // Display load bar for number of moves left

  const usedMoves = config.board.initialMoves - moves;

  let count = 0;

  return (
    <div className="Bar">
      {Array.from(Array(moves).keys()).map(() => (
        <BarBit key={count++} used={false} />
      ))}
      {Array.from(Array(usedMoves).keys()).map(() => (
        <BarBit key={count++} used={true} />
      ))}
    </div>
  );
}
