export default function StyleTools({
  clearAll,
  eraseOneWord,
  history,
  currentFileKey,
  undo,
  redo,
  redoStack,
  findChar,
  replaceChar,
  onFindChange,
  onReplaceChange,
  onReplaceChars,
  searchTerm,
  onSearchChange,
}) {
  return (
    <div className="actionsDiv">
      <button onClick={eraseOneWord}>מחק מילה</button>
      <button onClick={clearAll}>נקה הכל</button>
      <button
        onClick={undo}
        disabled={
          !history[currentFileKey] || history[currentFileKey].length <= 0
        }
      >
        בטל ↶
      </button>
      <button
        onClick={redo}
        disabled={
          !redoStack[currentFileKey] || redoStack[currentFileKey].length === 0
        }
      >
        החזר ↷
      </button>
      <label >
        חפש:
        <input
        type="search"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      </label>
      
      <div className="replaceDiv">
        <label>החלף: </label>
        <input
          type="text"
          maxLength={1}
          value={findChar}
          onChange={(e) => onFindChange(e.target.value)}
        />
        <label> ב: </label>
        <input
          type="text"
          maxLength={1}
          value={replaceChar}
          onChange={(e) => onReplaceChange(e.target.value)}
        />
        <button onClick={onReplaceChars}>החלף הכל</button>
      </div>
    </div>
  );
}
