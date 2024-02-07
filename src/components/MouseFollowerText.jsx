function MouseFollowerText({ position }) {
  return (
    <div style={{ position: "fixed", top: position.y, left: position.x + 5 }}>
      Yorum yazmak icin tikla
    </div>
  );
}

export default MouseFollowerText;
