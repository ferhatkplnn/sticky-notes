import PropTypes from "prop-types";

function Note({ note }) {
  return (
    <>
      <div
        key={note.id}
        className="note"
        style={{
          position: "absolute",
          top: note.position.y,
          left: note.position.x,
          "--color": note.color,
        }}
      >
        {note.note}
      </div>
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
