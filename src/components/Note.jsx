import PropTypes from "prop-types";
import { useState } from "react";
import Draggable from "react-draggable";

function Note({ note, setMode, notes, setNotes, mousePosition }) {
  const [visible, setVisible] = useState(false);
  const [clickable, setClickable] = useState(true);
  const [positionMem, setPositionMem] = useState(mousePosition);

  const handleClick = () => {
    if (clickable) {
      setVisible(!visible);
    }
  };

  const setNotePosition = (e) => {
    if (
      mousePosition.x[0] === positionMem.x[0] &&
      mousePosition.y[0] === positionMem.y[0]
    )
      return;
    const newNotes = notes.map((n) =>
      n.id === note.id
        ? { ...n, position: { x: e.pageX - 20, y: e.pageY - 25 } }
        : n
    );
    setNotes(newNotes);
  };

  const handleDelete = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes([...filteredNotes]);
  };

  return (
    <>
      <Draggable
        onDrag={() => setClickable(false)}
        onStart={() => {
          setPositionMem(mousePosition);
          setClickable(true);
        }}
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

          {visible && (
            <div className="note">
              {note.note}
              <button className="del-btn" onClick={() => handleDelete(note.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  style={{ width: "20px", height: "20px" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </Draggable>
    </>
  );
}

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    position: PropTypes.shape({
      y: PropTypes.number.isRequired,
      x: PropTypes.number.isRequired,
    }).isRequired,
    color: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    noteTitle: PropTypes.string.isRequired,
  }).isRequired,
  setMode: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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
  mousePosition: PropTypes.object,
};
export default Note;
