import PropTypes from "prop-types";
import { useState } from "react";
import Draggable from "react-draggable";

function Note({ note, setMode, notes, setNotes }) {
  const [visible, setVisible] = useState(false);
  const [clickable, setClickable] = useState(true);

  const handleClick = () => {
    if (clickable) {
      setVisible(!visible);
    }
  };

  const setNotePosition = (e) => {
    const newNotes = notes.map((n) =>
      n.id === note.id
        ? { ...n, position: { x: e.pageX - 20, y: e.pageY - 25 } }
        : n
    );
    setNotes(newNotes);
  };

  return (
    <>
      <Draggable
        onDrag={() => setClickable(false)}
        onStart={() => setClickable(true)}
        onStop={setNotePosition}
        position={note.position}
      >
        <div
          onMouseEnter={() => setMode(false)}
          onMouseLeave={() => setMode(true)}
          onClick={handleClick}
          className="note-title"
          style={{
            position: "absolute",
            cursor: "pointer",
            "--color": note.color,
          }}
        >
          {note.noteTitle}

          {visible && <div className="note">{note.note}</div>}
        </div>
      </Draggable>
    </>
  );
}

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    position: PropTypes.shape({
      y: PropTypes.number.isRequired,
      x: PropTypes.number.isRequired,
    }).isRequired,
    color: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
  }).isRequired,
  setMode: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      position: PropTypes.shape({
        y: PropTypes.number.isRequired,
        x: PropTypes.number.isRequired,
      }),
      color: PropTypes.string.isRequired,
      note: PropTypes.string.isRequired,
      noteTitle: PropTypes.string.isRequired,
    })
  ).isRequired,
  setNotes: PropTypes.func.isRequired,
};

export default Note;
