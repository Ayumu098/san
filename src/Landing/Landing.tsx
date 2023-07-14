import "./Landing.scss";
import Color from "./Color";
import config from "./config.json";

interface LandingProps {
  theme: string;
  darkMode: boolean;
  setDark: (darkMode: boolean) => void;
  setTheme: (color: string) => void;
  setStart: (start: boolean) => void;
  setSeed: (seed: string) => void;
}

function ColorDarkMode(darkMode: boolean, color: string) {
  if (darkMode && color === "black") {
    color = "white";
  } else if (!darkMode && color === "white") {
    color = "black";
  }

  return color;
}

export default function Landing({
  theme,
  darkMode,
  setDark,
  setTheme,
  setStart,
  setSeed,
}: LandingProps) {
  const style = darkMode
    ? { backgroundColor: "black", color: "white" }
    : { backgroundColor: "white", color: "black" };

  const toggleStyle = darkMode
    ? { backgroundColor: "black", borderColor: "white" }
    : { backgroundColor: "white", borderColor: "black" };

  return (
    <div className="Landing" style={style}>
      <div className="Introduction">
        <h1>SAN?</h1>
        <p> Socially Approaching Neighbors</p>
      </div>

      <input
        style={style}
        type="text"
        name="game"
        className="MapSelection"
        placeholder="Room Name"
        onChange={(e) => {
          setSeed(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setStart(true);
          }
        }}
      />

      <div className="Colors">
        {config.color.choices.map((color: string) => (
          <Color
            color={ColorDarkMode(darkMode, color)}
            selected={ColorDarkMode(darkMode, color) === theme}
            onClick={() => setTheme(ColorDarkMode(darkMode, color))}
          />
        ))}
        <button
          className="darkToggle"
          style={toggleStyle}
          onClick={() => setDark(!darkMode)}
        />
      </div>
    </div>
  );
}
