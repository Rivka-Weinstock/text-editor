import User from './components/User'
import { useState } from "react";
import Keyboard from "./components/Keyboard";
import TextFile from "./components/TextFile";
import StyleTools from "./components/StyleTools";
import ActionTools from "./components/ActionTools";
import "./App.css";

export default function App() {
  const [currentUser, setCurrentUser] = useState("Unknown");
  const [allUsers, setAllUsers] = useState([]);
  const [openFiles, setOpenFiles] = useState([
    { key: "ללא שם", text: [], indexOfFile: 0 ,owner: currentUser},
  ]);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("16px");
  const [history, setHistory] = useState({});
  const [findChar, setFindChar] = useState("");
  const [replaceChar, setReplaceChar] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [redoStack, setRedoStack] = useState({});

  function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function saveHistory(fileIndex) {
    const fileKey = openFiles[fileIndex].key;
    const snapshot = deepCopy(openFiles[fileIndex].text);
    setHistory((prev) => ({
      ...prev,
      [fileKey]: [...(prev[fileKey] || []), snapshot],
    }));
    setRedoStack((prev) => ({ ...prev, [fileKey]: [] }));
  }

  function handleAddChar(fileIndex, char) {
    saveHistory(fileIndex);
    const newFiles = [...openFiles];
    newFiles[fileIndex].text.push({
      char: char,
      font: selectedFont,
      color: selectedColor,
      size: selectedSize,
    });
    setOpenFiles(newFiles);
  }

  function handleErase(fileIndex) {
    saveHistory(fileIndex);
    const newFiles = [...openFiles];
    newFiles[fileIndex].text.pop();
    setOpenFiles(newFiles);
  }

  function handleNewRow(fileIndex) {
    saveHistory(fileIndex);
    const newFiles = [...openFiles];
    newFiles[fileIndex].text.push({
      char: "\n",
      font: selectedFont,
      color: selectedColor,
      size: selectedSize,
    });
    setOpenFiles(newFiles);
  }

  function handleClearAll(fileIndex) {
    saveHistory(fileIndex);
    const newFiles = [...openFiles];
    newFiles[fileIndex].text = [];
    setOpenFiles(newFiles);
  }

  function handleEraseOneWord(fileIndex) {
    saveHistory(fileIndex);
    const newFiles = [...openFiles];
    const textArr = newFiles[fileIndex].text;
    let lastSpace = -1;
    for (let i = textArr.length - 1; i >= 0; i--) {
      if (textArr[i].char == " " || textArr[i].char == "\n") {
        lastSpace = i;
        break;
      }
    }
    newFiles[fileIndex].text = textArr.slice(0, lastSpace >= 0 ? lastSpace : 0);
    setOpenFiles(newFiles);
  }

  function handleUndo(fileIndex) {
    const fileKey = openFiles[fileIndex].key;
    const fileHistory = history[fileKey] || [];
    if (fileHistory.length == 0) return;
    const currentSnapshot = deepCopy(openFiles[fileIndex].text);
    setRedoStack((prev) => ({
      ...prev,
      [fileKey]: [...(prev[fileKey] || []), currentSnapshot],
    }));
    const previousSnapshot = fileHistory[fileHistory.length - 1];
    const newFiles = [...openFiles];
    newFiles[fileIndex] = {
      ...newFiles[fileIndex],
      text: deepCopy(previousSnapshot),
    };
    setOpenFiles(newFiles);
    setHistory((prev) => ({
      ...prev,
      [fileKey]: prev[fileKey].slice(0, -1),
    }));
  }

  function handleRedo(fileIndex) {
    const fileKey = openFiles[fileIndex].key;
    const fileRedo = redoStack[fileKey] || [];
    if (fileRedo.length == 0) return;
    const currentSnapshot = deepCopy(openFiles[fileIndex].text);
    setHistory((prev) => ({
      ...prev,
      [fileKey]: [...(prev[fileKey] || []), currentSnapshot],
    }));
    const nextSnapshot = fileRedo[fileRedo.length - 1];
    const newFiles = [...openFiles];
    newFiles[fileIndex] = {
      ...newFiles[fileIndex],
      text: deepCopy(nextSnapshot),
    };
    setOpenFiles(newFiles);
    setRedoStack((prev) => ({
      ...prev,
      [fileKey]: prev[fileKey].slice(0, -1),
    }));
  }

  function changeStyleAll(styleKey) {
    const newFiles = [...openFiles];
    newFiles[currentFileIndex].text = newFiles[currentFileIndex].text.map(
      (charObj) => ({
        ...charObj,
        [styleKey]:
          styleKey === "font"
            ? selectedFont
            : styleKey === "color"
              ? selectedColor
              : styleKey === "size"
                ? selectedSize
                : charObj[styleKey],
      })
    );
    setOpenFiles(newFiles);
  }

  function handleReplaceChars() {
    if (!openFiles.length) return;
    saveHistory(currentFileIndex);
    const newFiles = [...openFiles];
    newFiles[currentFileIndex] = {
      ...newFiles[currentFileIndex],
      text: newFiles[currentFileIndex].text.map((charObj) =>
        charObj.char === findChar ? { ...charObj, char: replaceChar } : charObj
      ),
    };
    setOpenFiles(newFiles);
  }

  function createNewFile() {
    const newFile = { key: currentFileIndex, text: [], indexOfFile: openFiles.length };
    setOpenFiles((prev) => [...prev, newFile]);
    setCurrentFileIndex(openFiles.length);
  }

  function openFile() {
     if(currentUser==="Unknown"){
      alert("עלייך להרשם תחילה")
      return;
    }
    const keyName = prompt("שם הקובץ לפתיחה:");
    if (!keyName) return;
    const storedData = localStorage.getItem("users");
    const users = JSON.parse(storedData);
    const currentUserData = users.find(user => user.name === currentUser);
    const fileDataEntry = currentUserData.files.find(f => f.key === keyName);
    const newFiles = [...openFiles, { ...fileDataEntry, key: keyName,owner: currentUser }];
    setOpenFiles(newFiles);
    alert(`קובץ "${keyName}" נטען`);
  }

  return (

    <div className="appContainer">
      <User
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        allUsers={allUsers}
        setAllUsers={setAllUsers}
      />
      <div className="topBar">
        <button onClick={openFile}>פתח</button>
        <button onClick={() => createNewFile()}>חדש</button>
      </div>
      <div className="fileArea">
        {openFiles.map((file, index) => (
          <TextFile
            key={file.key}
            file={file}
            index={index}
            openFiles={openFiles}
            setOpenFiles={setOpenFiles}
            currentFileIndex={index}
            setCurrentFileIndex={setCurrentFileIndex}
            setHistory={setHistory}
            setRedoStack={setRedoStack}
            searchTerm={searchTerm}
            currentUser={currentUser}
          />
        ))}
      </div>
      <div className="bottomBar">
        <StyleTools
          selectedFont={selectedFont}
          selectedSize={selectedSize}
          onColorChange={setSelectedColor}
          onFontChange={setSelectedFont}
          onSizeChange={setSelectedSize}
          changeStyleAll={changeStyleAll}
        />
        <Keyboard
          addChar={(char) => handleAddChar(currentFileIndex, char)}
          erase={() => handleErase(currentFileIndex)}
          newRow={() => handleNewRow(currentFileIndex)}
        />
        <ActionTools
          clearAll={() => handleClearAll(currentFileIndex)}
          eraseOneWord={() => handleEraseOneWord(currentFileIndex)}
          undo={() => handleUndo(currentFileIndex)}
          redo={() => handleRedo(currentFileIndex)}
          history={history}
          redoStack={redoStack}
          currentFileKey={openFiles[currentFileIndex]?.key}
          findChar={findChar}
          replaceChar={replaceChar}
          onFindChange={setFindChar}
          onReplaceChange={setReplaceChar}
          onReplaceChars={handleReplaceChars}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>
    </div>
  );
}
