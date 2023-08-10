function highlightMatchedString(text: string, highlight: string) {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <strong key={index}>{part}</strong>
        ) : (
          part
        )
      )}
    </span>
  );
}

export default highlightMatchedString;
