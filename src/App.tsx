import "./App.scss";
import Map from "./Map/Map";
import Landing from "./Landing/Landing";
import { useState } from "react";

export default function App() {

  // Sets the color of the background and components
  const [darkMode, setDark] = useState(true);
  const [theme, setTheme] = useState("white");

  //  Replaces Landing with Map on start
  const [start, setStart] = useState(false);

  // Seed for random number generator of Map
  const [seed, setSeed] = useState("start");

  // Sets the background color based on mode (dark or light)
  const background = { backgroundColor: darkMode ? "black" : "white" };

  if (darkMode && theme === "black") {
    setTheme("white");
  } else if (!darkMode && theme === "white") {
    setTheme("black");
  }

  return (
    <div className="App" style={background}>
      {start ? (
        <Map
          darkMode={darkMode}
          theme={theme}
          seed={seed}
        />
      ) : (
        <Landing
          darkMode={darkMode}
          theme={theme}
          setDark={setDark}
          setTheme={setTheme}
          setStart={setStart}
          setSeed={setSeed}
        />
      )}
    </div>
  );
}
