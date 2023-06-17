import "./Cell.scss";

interface ColorProps {
  reference: number;
  intensity: number;
}

export default function Cell({ reference, intensity }: ColorProps) {
  const color = `rgb(${intensity}, ${intensity}, ${intensity})`;
  return (
    <td className="Cell" key={reference} style={{ backgroundColor: color }}>
    </td>
  );
}
