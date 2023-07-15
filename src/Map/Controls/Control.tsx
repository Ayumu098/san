import "./Control.scss";

interface ControlProps {
  darkMode: boolean;
  direction: string;
  move: (x_change: number, y_change: number) => void;
}

export default function Control({ darkMode, direction, move }: ControlProps) {

  // Styling for background and components based on dark/light mode
  const style = darkMode
    ? { backgroundColor: "black", color: "white" }
    : { backgroundColor: "white", color: "black" };

  // Arrow notatiion to unicode for reference
  const arrowCodeMapping: { [key: string]: string } = {
    up: "\u2191",
    down: "\u2193",
    left: "\u2190",
    right: "\u2192",
  };

  // Arrow notation to x and y change for reference
  const arrowMoveMapping: { [key: string]: number[] } = {
    up: [+0, -1],
    down: [+0, +1],
    left: [-1, +0],
    right: [+1, +0],
  };

  return (
    <button
      className="Control"
      onClick={() =>
        move(arrowMoveMapping[direction][0], arrowMoveMapping[direction][1])
      }
      style={style}
    >
      {arrowCodeMapping[direction]}
    </button>
  );
}
