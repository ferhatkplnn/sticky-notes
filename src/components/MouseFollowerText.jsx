import PropTypes from "prop-types";

function MouseFollowerText({ position }) {
  return (
    <div
      className="mouse-follower-text"
      style={{ position: "fixed", top: position.y, left: position.x + 15 }}
    >
      Yorum yazmak icin tikla
    </div>
  );
}

MouseFollowerText.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};
export default MouseFollowerText;
