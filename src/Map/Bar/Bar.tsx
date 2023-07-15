import BarBit from "./BarBit";
import config from "../config.json";

import "./Bar.scss";

interface BarProps {
  darkMode: boolean;
  moves: number;
}

export default function Bar({ darkMode, moves }: BarProps) {
  // Display load bar for number of moves left

  // For keying the BarBits
  let count = 0;

  return (
    <div className="Bar">
      {Array.from(Array(moves).keys()).map(() => (
        <BarBit darkMode={darkMode} key={count++} used={false} />
      ))}
      {Array.from(Array(config.board.initialMoves - moves).keys()).map(() => (
        <BarBit darkMode={darkMode} key={count++} used={true} />
      ))}
    </div>
  );
}
