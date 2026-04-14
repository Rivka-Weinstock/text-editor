export default function Textbox({
  text = [],
  searchTerm = "",
}) {
  const cleanSearchTerm = (searchTerm || "").toString().trim();
  const fullText = text.map((o) => o.char).join("");
  if (!cleanSearchTerm) {
    return (
      <div className="textboxDiv">
        {text.map((o, i) => (
          <span key={i} style={{ fontFamily: o.font, color: o.color, fontSize: o.size }}>
            {o.char}
          </span>
        ))}
      </div>
    );
  }
  const lowerFull = fullText.toLowerCase();
  const lowerSearch = cleanSearchTerm.toLowerCase();
  const matches = [];
  let idx = lowerFull.indexOf(lowerSearch);
  while (idx !== -1) {
    matches.push(idx);
    idx = lowerFull.indexOf(lowerSearch, idx + 1);
  }

  return (
    <div className="textboxDiv">
      {text.map((o, i) => {
        const inHighlight = matches.some((start) => i >= start && i < start + cleanSearchTerm.length);
        return (
          <span
            key={i}
            style={{
              fontFamily: o.font,
              color: o.color,
              fontSize: o.size,
              backgroundColor: inHighlight ? "yellow" : "transparent",
            }}
          >
            {o.char}
          </span>
        );
      })}
    </div>
  );
}

