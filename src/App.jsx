import { useRef } from "react";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import MouseFollowerText from "./components/MouseFollowerText";
import Note from "./components/Note";
function App() {
  const screen = useRef(null);
  const [mode, setMode] = useState(false);
  const [notes, setNotes] = useState([
    {
      id: "1",
      note: "bu bir test note dur",
      color: "red",
      position: {
        x: 300,
        y: 300,
      },
    },
  ]);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const [boxPostion, setBoxPostion] = useState({
    x: 0,
    y: 0,
  });
  const [boxVisible, setBoxVisible] = useState(false);

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

  const handleClick = () => {
    setBoxPostion({
      x: position.x,
      y: position.y,
    });
    setBoxVisible(true);
  };

  return (
    <div
      ref={screen}
      tabIndex={0}
      className={`screen  ${mode ? "editable" : ""}`}
      onMouseMove={handleMouseMove}
      onKeyUp={handleKeyUp}
      onClick={handleClick}
    >
      <img
        src="https://images.unsplash.com/photo-1550475966-70af27831597?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
      {mode && <MouseFollowerText position={position} />}

      {mode && <div>Comment Mode</div>}

      {notes.map((note) => {
        return <Note key={note.id} note={note} />;
      })}
    </div>
  );
}

export default App;
