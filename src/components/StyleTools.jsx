import ColorButton from "./ColorButton";

export default function STools({
  selectedFont,
  selectedSize,
  onColorChange,
  onFontChange,
  onSizeChange,
  changeStyleAll,
}) {
  const colors = [
    ["ForestGreen", "DarkMagenta", "Black"],
    ["DarkSlateBlue", "PaleVioletRed", "Sienna"],
    ["Yellow", "DarkOrange", "Red"],
  ];

  function createColorButtons() {
    return colors.map((row, rowIndex) => (
      <div key={rowIndex}>
        {row.map((color) => (
          <ColorButton
            key={color}
            color={color}
            onColorChange={onColorChange}
          />
        ))}
      </div>
    ));
  }

  return (
      <div className="StyleDiv">
        <div className="colorsDiv">
          {createColorButtons()}
          <label>
            <input
              type="color"
              onChange={(e) => onColorChange(e.target.value)}
              
            />
            צבעים נוספים
          </label>
          <button className="forAllBtn" onClick={() => changeStyleAll("color")}>
            החל צבע על הכל
          </button>
        </div>

        <div className="fontsDiv">
          <select
            value={selectedFont}
            onChange={(e) => onFontChange(e.target.value)}
          >
            <option value="Aharoni">Aharoni</option>
            <option value="Arial">Arial</option>
            <option value="Narkisim">Narkisim</option>
            <option value="Rod">Rod</option>
            <option value="Segoe UI Light">Segoe UI Light</option>
          </select>
          <button  className="forAllBtn" onClick={() => changeStyleAll("font")} >
            החל גופן על הכל
          </button>
        </div>
        <div className="sizeDiv">
          <select
            value={selectedSize}
            onChange={(e) => onSizeChange(e.target.value)}
          >
            <option value="12px">12</option>
            <option value="14px">14</option>
            <option value="16px">16</option>
            <option value="18px">18</option>
            <option value="20px">20</option>
            <option value="24px">24</option>
          </select>
          <button className="forAllBtn" onClick={() => changeStyleAll("size")}  >
            החל גודל על הכל
          </button>
        </div>
      </div>
  );
}
