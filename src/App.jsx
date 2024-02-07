import { useRef, useEffect, useState } from "react";
import "./App.css";
import MouseFollowerText from "./components/MouseFollowerText";
import Note from "./components/Note";
import NoteAddBox from "./components/NoteAddBox";

const initialNotes = JSON.parse(localStorage.getItem("notes")) || [];

function App() {
  const screen = useRef(null);
  const [mode, setMode] = useState(false);
  const [notes, setNotes] = useState(initialNotes);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [boxPosition, setBoxPosition] = useState({
    x: 0,
    y: 0,
  });
  const [boxVisible, setBoxVisible] = useState(false);

  useEffect(() => {
    screen.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleKeyUp = (e) => {
    if (e.key === "c" && !boxVisible) {
      setMode(!mode);
      setBoxVisible(false);
    }

    if (e.key === "Escape") {
      setBoxVisible(false);
    }
  };

  const handleMouseMove = (e) => {
    setMousePosition({ x: [e.pageX, e.clientX], y: [e.pageY, e.clientY] });
  };

  const handleClick = () => {
    if (!mode) return;

    setBoxPosition({
      x: mousePosition.x[0],
      y: mousePosition.y[0],
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
      {mode && <MouseFollowerText position={mousePosition} />}

      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          setMode={setMode}
          notes={notes}
          setNotes={setNotes}
          mousePosition={mousePosition}
        />
      ))}

      {boxVisible && (
        <NoteAddBox
          boxPosition={boxPosition}
          setMode={setMode}
          notes={notes}
          setNotes={setNotes}
          setBoxVisible={setBoxVisible}
        />
      )}

      <div style={{ color: "white" }}>Press the "c" key to add a Note.</div>
    </div>
  );
}

export default App;
