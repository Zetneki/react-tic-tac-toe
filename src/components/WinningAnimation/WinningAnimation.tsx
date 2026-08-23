import "./WinningAnimation.scss";
import win from "../../assets/drawing.svg";
import type { GameResult } from "../../modules/gameResult";

function WinningAnimation({
  result,
  onRestart,
}: {
  result: GameResult;
  onRestart: () => void;
}) {
  return (
    <div className="winning-animation" onClick={() => onRestart()}>
      <div className="halftone"></div>
      <div className="winner">
        <img src={win} alt="winner burst" />

        {result.type === "draw" ? (
          <h1>DRAW!</h1>
        ) : (
          <h1>{result.player?.name} WINS!</h1>
        )}
      </div>
    </div>
  );
}

export default WinningAnimation;
