import "./Cell.scss";

interface ColorProps {
  color: string;
  intensity: number;
}

export default function Cell({ color, intensity }: ColorProps) {
  // Renders a cell with the appropriate color and intensity

  // The opacity of the cell is based on the intensity
  const style = { backgroundColor: color, opacity: intensity };
  return <td className="Cell" style={style} />;
}
