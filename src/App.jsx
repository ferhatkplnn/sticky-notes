import { useRef } from "react";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import MouseFollowerText from "./components/MouseFollowerText";
import Note from "./components/Note";
import NoteAddBox from "./components/NoteAddBox";

const initialNote = JSON.parse(localStorage.getItem("notes")) || [];

function App() {
  const screen = useRef(null);
  const [mode, setMode] = useState(false);
  const [notes, setNotes] = useState(initialNote);
  const [mousePosition, setMousePosition] = useState({
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

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleKeyUp = (e) => {
    if (e.key === "c" && !boxVisible) {
      setMode(!mode);
      setBoxVisible(false);
    }
    console.log(e.key);
    if (e.key === "Escape") {
      setBoxVisible(false);
    }
  };

  const handleMouseMove = (e) => {
    setMousePosition({ x: [e.pageX, e.clientX], y: [e.pageY, e.clientY] });
  };

  const handleClick = () => {
    if (!mode) return;

    setBoxPostion({
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
      <img
        src="https://images.unsplash.com/photo-1550475966-70af27831597?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
      {mode && <MouseFollowerText position={mousePosition} />}

      {notes.map((note, index) => {
        return (
          <Note
            key={note.id}
            index={index}
            note={note}
            setMode={setMode}
            notes={notes}
            setNotes={setNotes}
          />
        );
      })}

      {boxVisible && (
        <NoteAddBox
          boxPostion={boxPostion}
          setMode={setMode}
          notes={notes}
          setNotes={setNotes}
          setBoxVisible={setBoxVisible}
        />
      )}
    </div>
  );
}

export default App;
