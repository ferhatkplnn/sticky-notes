import { useState } from "react";
import { nanoid } from "nanoid";

const noteTypes = [
  {
    name: "comment",
    color: "purple",
    text: "Comment",
  },
  {
    name: "private-comment",
    color: "#999",
    text: "Private Comment",
  },
  {
    name: "note",
    color: "orange",
    text: "Note",
  },
];
function NoteAddBox({ boxPosition, setMode, notes, setNotes, setBoxVisible }) {
  const [color, setColor] = useState(noteTypes[0].color);
  const [note, setNote] = useState("");

  const changeColor = (e) => {
    setColor(e.target.value);
  };

  const addNote = () => {
    if (!note) return;
    const newNote = {
      id: nanoid(),
      note,
      color,
      position: {
        x: boxPosition.x - 20,
        y: boxPosition.y - 20,
      },
    };

    setNotes([...notes, newNote]);
    setNote("");
    setBoxVisible(false);
    setMode(true);
  };

  return (
    <div
      onMouseEnter={() => setMode(false)}
      onMouseLeave={() => setMode(true)}
      className="note-box"
      style={{
        "--color": color,
        position: "absolute",
        top: boxPosition.y + 10,
        left: boxPosition.x + 20,
      }}
    >
      <span className="note-box-number">{notes.length + 1}</span>
      <select onChange={changeColor}>
        {noteTypes.map(({ text, color }, index) => (
          <option key={index} value={color}>
            {text}
          </option>
        ))}
      </select>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Enter note"
        rows="10"
      ></textarea>
      <button onClick={addNote}>Ekle</button>
    </div>
  );
}

export default NoteAddBox;
