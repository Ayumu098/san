import "./App.scss";
import Map from "./Map/Map";
import Landing from "./Landing/Landing";
import { useState } from "react";

export default function App() {
  const [darkMode, setDark] = useState(true);
  const [theme, setTheme] = useState("red");
  const [start, setStart] = useState(false);

  const [seed, setSeed] = useState("start");

  const background = { backgroundColor: darkMode ? "black" : "white" };

  return (
    <div className="App" style={background}>
      {start ? (
        <Map darkMode={darkMode} theme={theme} seed={seed}/>
      ) : (
        <>
        <Landing darkMode={darkMode} theme={theme} setDark={setDark} setTheme={setTheme} setStart={setStart} setSeed={setSeed
        } />
        </>
      )}


    </div>
  );
}
