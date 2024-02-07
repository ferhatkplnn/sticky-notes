import PropTypes from "prop-types";
import { useState } from "react";
import Draggable from "react-draggable";

function Note({ note, index, setMode }) {
  const [visible, setVisible] = useState(false);
  const [clickable, setClickable] = useState(true);

  const handleClick = () => {
    if (clickable) {
      setVisible(!visible);
    }
  };
  return (
    <>
      <Draggable
        onDrag={() => setClickable(false)}
        onStart={() => setClickable(true)}
      >
        <div
          onMouseEnter={() => setMode(false)}
          onMouseLeave={() => setMode(true)}
          onClick={handleClick}
          className="note-box-number"
          style={{
            position: "absolute",
            cursor: "pointer",
            top: note.position.y - 30,
            left: note.position.x - 40,
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
