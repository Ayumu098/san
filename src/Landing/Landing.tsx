import "./Landing.scss";
import Color from "./Color";
import config from "./config.json";

interface LandingProps {
  darkMode: boolean;
  theme: string;
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
  darkMode,
  theme,
  setDark,
  setTheme,
  setStart,
  setSeed,
}: LandingProps) {
  const style = darkMode
    ? {
        backgroundColor: "black",
        color: "white",
      }
    : {
        backgroundColor: "white",
        color: "black",
      };

  return (
    <div className="Landing" style={style}>
      <div className="Introduction">
        <h1>SAN?</h1>
        <p> Socially Approaching Neighbors</p>
      </div>
      <div className="Buttons">
        <button className="Start" onClick={() => setStart(true)} style={style}>
          Start
        </button>
        <button
          className="darkToggle"
          onClick={() => setDark(!darkMode)}
          style={style}
        >
          {darkMode ? "Dark" : "Light"}
        </button>
      </div>
      <input style={style}
            type="text"
            name="game"
            className="seed"
            placeholder="Type anything here for a new map"
            onChange={(e) => {
              setSeed(e.target.value);
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
      </div>
    </div>
  );
}
