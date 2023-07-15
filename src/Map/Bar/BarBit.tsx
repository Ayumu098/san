import "./BarBit.scss";

interface BarBitProps {
    darkMode: boolean;
    used: boolean;
}

export default function BarBit({darkMode, used}: BarBitProps) {
  // Styling for background and components based on dark/light mode
  const style = darkMode
    ? { backgroundColor: "white" }
    : { backgroundColor: "black" };

    // Represents a single bit of the load bar for one move left
    return <div style={style} className={used ? "BarBit Used" : "BarBit"}/>;
  }
