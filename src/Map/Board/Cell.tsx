import "./Cell.scss";

interface ColorProps {
  color: string;
  reference: number;
  intensity: number;
}

export default function Cell({ color, reference, intensity }: ColorProps) {
  // Renders a cell with the appropriate color and intensity

  // The opacity of the cell is based on the intensity
  const style = { backgroundColor: color, opacity: intensity };
  return <td className="Cell" key={reference} style={style} />;
}
