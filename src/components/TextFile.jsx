import Textbox from "./Textbox";

export default function TextFile({
  file,
  index,
  openFiles,
  setOpenFiles,
  currentFileIndex,
  setCurrentFileIndex,
  setHistory,
  setRedoStack,
  searchTerm,
  currentUser,
}) {

  function saveFile(fileIndex) {
    if (currentUser === "Unknown") {
      alert("עלייך להרשם תחילה")
      return;
    }
    const file = openFiles[fileIndex];
    if (!file) return;
    let users = JSON.parse(localStorage.getItem("users"));
    let currentUserInLocalStorage = users.find(user => user.name === currentUser);
    const existingFileIndex = currentUserInLocalStorage.files.findIndex(f => f.key === file.key);
    currentUserInLocalStorage.files[existingFileIndex] = file;
    localStorage.setItem("users", JSON.stringify(users));
    alert(`קובץ "${file.key}" נשמר בהצלחה!`);
  }


  function saveFileAs(fileIndex) {
    if (currentUser === "Unknown") {
      alert("עלייך להרשם תחילה")
      return;
    }
    const file = openFiles[fileIndex];
    const keyName = prompt("שמור בשם:");
    if (!keyName) return;
    const newFile = { ...file, key: keyName, owner: currentUser };
    const newFiles = [...openFiles];
    newFiles[fileIndex] = newFile;
    setOpenFiles(newFiles);
    let users = localStorage.getItem("users");
    users = JSON.parse(users);
    let currentUserInLocalStorage = users.find(user => user.name === currentUser);
    currentUserInLocalStorage.files = [...currentUserInLocalStorage.files, newFile]
    localStorage.setItem("users", JSON.stringify(users));
    alert(`קובץ "${keyName}" נשמר בהצלחה!`);
  }

  function closeFile(fileIndex) {
    const file = openFiles[fileIndex];
    if (!file) return;
    const choice = confirm(
      `האם ברצונך לשמור את הקובץ "${file.key}" לפני הסגירה?\nלחץ על אישור כדי לשמור, או על ביטול כדי לסגור מבלי לשמור.`
    );
    if (choice) {
      saveFile(fileIndex);
    }
    const newFiles = [...openFiles];
    newFiles.splice(fileIndex, 1);
    if (newFiles.length === 0) {
      const newFile = {
        key: currentFileIndex,
        text: [],
        indexOfFile: 0,
      };
      setOpenFiles([newFile]);
      setCurrentFileIndex(prev=>prev+1);
    } else {
      const newIndex = Math.min(fileIndex, newFiles.length - 1);
      setOpenFiles(newFiles);
      setCurrentFileIndex(newIndex);
    }
    setHistory((prev) => {
      const newHistory = { ...prev };
      delete newHistory[file.key];
      return newHistory;
    });

    setRedoStack((prev) => {
      const newRedo = { ...prev };
      delete newRedo[file.key];
      return newRedo;
    });
  }

  return (
    <div
      className={`textboxDiv ${currentFileIndex === index ? "active" : ""}`}
      onClick={() => setCurrentFileIndex(index)}
    >
      <div className="title">מסמך {file.key}</div>
      <div className="meta">{file.text.length} תווים</div>
      <div className="fileButtons">
        <span>{openFiles[currentFileIndex].key}</span>
        <button onClick={() => closeFile(currentFileIndex)}>✕</button>
        <button onClick={() => saveFile(currentFileIndex)}>שמור</button>
        <button onClick={() => saveFileAs(currentFileIndex)}>שמור בשם</button>
      </div>
      <Textbox
        key={openFiles[currentFileIndex].key}
        text={openFiles[currentFileIndex].text}
        currentFileIndex={currentFileIndex}
        setCurrentFileIndex={setCurrentFileIndex}
        searchTerm={searchTerm}
      />
    </div>
  );
}
