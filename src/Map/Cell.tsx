import "./Cell.scss";

interface ColorProps {
  color: string;
  reference: number;
  intensity: number;
}

export default function Cell({ color, reference, intensity }: ColorProps) {
  return (
    <td
      className="Cell"
      key={reference}
      style={{ backgroundColor: color, opacity: intensity }}
    ></td>
  );
}
