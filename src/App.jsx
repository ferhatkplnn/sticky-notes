import { useRef } from "react";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import MouseFollowerText from "./components/MouseFollowerText";
function App() {
  const screen = useRef(null);
  const [mode, setMode] = useState(false);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    screen.current.focus();
  }, []);

  const handleKeyUp = (e) => {
    if (e.key === "c") {
      console.log("comment mode active");
      setMode(!mode);
    }
  };

  const handleMouseMove = (e) => {
    setPosition({ x: e.pageX, y: e.pageY });
  };
  return (
    <div
      ref={screen}
      tabIndex={0}
      className="screen"
      onMouseMove={handleMouseMove}
      onKeyUp={handleKeyUp}
    >
      <img
        src="https://images.unsplash.com/photo-1550475966-70af27831597?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
      <MouseFollowerText position={position} />

      {mode && <div>Comment Mode</div>}
    </div>
  );
}

export default App;
