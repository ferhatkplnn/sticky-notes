import PropTypes from "prop-types";

function MouseFollowerText({ position }) {
  return (
    <div style={{ position: "fixed", top: position.y, left: position.x + 5 }}>
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
