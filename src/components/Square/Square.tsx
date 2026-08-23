import "./Square.scss";

function Square({
  value,
  isWinning,
  isSelected,
  onSquareClick,
}: {
  value: string | null;
  isWinning: boolean;
  isSelected: boolean;
  onSquareClick: () => void;
}) {
  let className = "";
  if (isWinning) className += " winning";
  if (isSelected) className += " selected";

  return (
    <button className={`square ${className}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default Square;
