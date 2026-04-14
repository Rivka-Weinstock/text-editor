import { useState } from "react";
import Key from "./Key";

export default function Keyboard({ addChar, erase, newRow }) {
  const HebrewKeyboard = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "⇦"],
    ["/", "'", "ק", "ר", "א", "ט", "ו", "ן", "ם", "פ", "]", "["],
    ["ש", "ד", "ג", "כ", "ע", "י", "ח", "ל", "ך", "ף", ",", "↵"],
    ["ז", "ס", "ב", "ה", "נ", "מ", "צ", "ת", "ץ", "."],
    ["⇆", " "],
  ];
  const EnglishKeyboard = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "⇦"],
    ["/", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", ":", "'", "↵"],
    ["z", "x", "c", "v", "b", "n", "m", ",", ".", "?"],
    ["⇆", " "],
  ];
  const capslockKeyboard = [
    ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "⇦"],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "↵"],
    ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
    ["⇆", " "],
  ];
  const emogiKeyboard = [
    [
      "😀",
      "😁",
      "😂",
      "🤣",
      "😃",
      "😄",
      "😆",
      "😉",
      "😋",
      "😎",
      "😍",
      "😘",
      "⇦",
    ],
    ["🥰", "😗", "🥲", "😚", "☺️", "🙂", "🤗", "🤩", "🤔", "🫡", "🫠", "😐"],
    ["😑", "😶", "🫥", "😵", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯", "↵"],
    ["😫", "🥱", "😴", "😌", "😖", "🙃", "😟", "😒", "😓", "😔"],
    ["⇆", " "],
  ];
  const languages = [
    HebrewKeyboard,
    EnglishKeyboard,
    capslockKeyboard,
    emogiKeyboard,
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentKeyboard = languages[currentIndex];

  function switchLanguage() {
    setCurrentIndex((prev) => (prev + 1) % languages.length);
  }

  function createKeyboard() {
    return currentKeyboard.map((row, rowIndex) => (
      <div  dir="ltr" key={rowIndex}>
        {row.map((key) => (
          <Key
            key={key}
            value={key}
            handleClick={handleClick}
            className={
              key === "⇦" || key === "↵" || key === "⇆"
                ? "specialButtons"
                : key === " "
                ? "space"
                : ""
            }
          />
        ))}
      </div>
    ));
  }

  function handleClick(value) {
    if (value == "⇆") switchLanguage();
    else if (value == "⇦") erase();
    else if (value == "↵") newRow();
    else addChar(value);
  }

  return <div className="keyboardDiv">{createKeyboard()}</div>;
}
