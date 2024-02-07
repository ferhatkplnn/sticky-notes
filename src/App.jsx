import { useRef } from "react";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
function App() {
  const screen = useRef(null);
  const [mode, setMode] = useState(false);

  useEffect(() => {
    screen.current.focus();
  }, []);

  const handleKeyUp = (e) => {
    if (e.key === "c") {
      console.log("comment mode active");
      setMode(!mode);
    }
  };
  return (
    <div ref={screen} tabIndex={0} className="screen" onKeyUp={handleKeyUp}>
      {mode && <div>Comment Mode</div>}
    </div>
  );
}

export default App;
