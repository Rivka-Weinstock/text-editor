export default function ColorButton({ color, onColorChange }) {
  return (
    <button
      className="colorButton"
      style={{ backgroundColor: color }}
      onClick={() => onColorChange(color)}
    ></button>
  );
}
