function NoteBox({ boxPostion }) {
  const noteTypes = [
    {
      name: "comment",
      color: "red",
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
  return (
    <div
      className="note-box"
      style={{
        position: "absolute",
        top: boxPostion.y,
        left: boxPostion.x + 15,
      }}
    >
      <select>
        {noteTypes.map((type, index) => (
          <option key={index} value={type.name}>
            {type.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default NoteBox;
