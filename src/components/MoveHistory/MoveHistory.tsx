import "./MoveHistory.scss";

function MoveHistory({
  history,
  jumpTo,
}: {
  history: Array<Array<string | null>>;
  jumpTo: (move: number) => void;
}) {
  const moveButtons = history.map((squares, move) => {
    let description;

    if (move === 0) return;
    description = "Go to move " + move;

    return (
      <button className="move" key={move} onClick={() => jumpTo(move)}>
        {description}
      </button>
    );
  });

  return <div className="move-history">{moveButtons}</div>;
}

export default MoveHistory;
