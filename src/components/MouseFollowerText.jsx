import PropTypes from "prop-types";

function MouseFollowerText({ position }) {
  return (
    <div
      className="mouse-follower-text"
      style={{
        position: "fixed",
        top: position.y[1],
        left: position.x[1] + 15,
      }}
    >
      Click to leave a comment
    </div>
  );
}

MouseFollowerText.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.array.isRequired,
    y: PropTypes.array.isRequired,
  }).isRequired,
};
export default MouseFollowerText;
