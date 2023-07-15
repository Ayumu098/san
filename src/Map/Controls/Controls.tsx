import Control from "./Control";
import "./Controls.scss";

interface ControlsProps {
  darkMode: boolean;
  move: (x_change: number, y_change: number) => void;
}

export default function Controls({ darkMode, move }: ControlsProps) {
  // Generates the controls for the user to move around the map

  return (
    <div className="Controls">
      {["up", "down", "left", "right"].map((direction) => (
        <Control darkMode={darkMode} direction={direction} move={move} key={direction}/>
      ))}
    </div>
  );
}
