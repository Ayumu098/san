import "./Landing.scss";
import Color from "./Color";
import config from "./config.json";

function ColorDarkMode(darkMode: boolean, color: string) {
  // Sets the color to black if dark mode is on and the color is white
  // Sets the color to white if dark mode is off and the color is black
  // If color is neither black or white, returns the color as is
  // To ensure dark mode toggle makes grayscale colors seen

  if (darkMode && color === "black") {
    color = "white";
  } else if (!darkMode && color === "white") {
    color = "black";
  }

  return color;
}

// Set methods propagated from App.tsx
interface LandingProps {
    theme: string;
    darkMode: boolean;
    setDark: (darkMode: boolean) => void;
    setTheme: (color: string) => void;
    setStart: (start: boolean) => void;
    setSeed: (seed: string) => void;
  }

export default function Landing({
  theme,
  darkMode,
  setDark,
  setTheme,
  setStart,
  setSeed,
}: LandingProps) {


  // Styling for background and components based on dark/light mode
  const style = darkMode
    ? { backgroundColor: "black", color: "white" }
    : { backgroundColor: "white", color: "black" };

  // Styling for dark/light mode toggle
  const toggleStyle = darkMode
    ? { backgroundColor: "black", borderColor: "white" }
    : { backgroundColor: "white", borderColor: "black" };

  return (
    <div className="Landing" style={style}>
      <div className="Introduction">
        <h1>SAN <a href="https://github.com/Ayumu098/san" style={{color: theme}}>?</a></h1>
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
            key={ColorDarkMode(darkMode, color)}
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
