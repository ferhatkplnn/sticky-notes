import PropTypes from "prop-types";
import { useState } from "react";
import Draggable from "react-draggable";

function Note({ note, index, setMode, notes, setNotes }) {
  const [visible, setVisible] = useState(false);
  const [clickable, setClickable] = useState(true);

  const handleClick = () => {
    if (clickable) {
      setVisible(!visible);
    }
  };

  const setNotePosition = (e, data) => {
    console.log(e);
    let newNotes = notes.map((n) => {
      if (n.id === note.id) {
        return { ...n, position: { x: e.pageX - 20, y: e.pageY - 25 } };
      }
      return n;
    });
    console.log(newNotes);
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
          className="note-box-number"
          style={{
            position: "absolute",
            cursor: "pointer",
            "--color": note.color,
          }}
        >
          {index + 1}

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
    }),
    color: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
  }),
};

export default Note;
