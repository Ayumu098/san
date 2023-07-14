import "./App.scss";
import Map from "./Map/Map";
import Landing from "./Landing/Landing";
import { useState } from "react";

export default function App() {
  const [darkMode, setDark] = useState(true);
  const [theme, setTheme] = useState("white");
  const [start, setStart] = useState(false);
  const [seed, setSeed] = useState("start");

  const background = { backgroundColor: darkMode ? "black" : "white" };


  if (darkMode && theme === "black") {
    setTheme("white");
  } else if (!darkMode && theme === "white") {
    setTheme("black");
  }

  return (
    <div className="App" style={background}>
      {start ? (
        <Map darkMode={darkMode} theme={theme} seed={seed} />
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
