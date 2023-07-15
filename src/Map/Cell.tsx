import "./Cell.scss";

interface ColorProps {
  color: string;
  reference: number;
  intensity: number;
  breatheRate: number;
}

export default function Cell({
  color,
  reference,
  intensity,
  breatheRate,
}: ColorProps) {
  return (
    <td
      className="Cell"
      key={reference}
      style={{
        backgroundColor: color,
        opacity: intensity,
        animationDuration: `${breatheRate}s`,
      }}
    ></td>
  );
}
