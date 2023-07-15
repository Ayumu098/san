import "./BarBit.scss";

interface BarBitProps {
    used: boolean;
}

export default function BarBit({used}: BarBitProps) {
    // Represents a single bit of the load bar for one move left
    return <div className={used ? "BarBit Used" : "BarBit"}/>;
  }
