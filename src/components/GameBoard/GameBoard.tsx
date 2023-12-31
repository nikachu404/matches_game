import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import './game-board.scss';

type Props = {
  matches: number;
  initialMatches: number;
  isPlayerTurn: boolean;
  isPlayerTurnFirst: boolean;
  selectedMatches: number;
  matchesPerTurn: number;
  isGameOver: boolean;
  playerMatches: number;
  handleSliderChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTakeMatches: () => void;
  handleRestart: () => void;
};

export const GameBoard: React.FC<Props> = memo(
  ({
    matches,
    initialMatches,
    isPlayerTurn,
    isPlayerTurnFirst,
    selectedMatches,
    matchesPerTurn,
    isGameOver,
    handleSliderChange,
    handleTakeMatches,
    handleRestart,
    playerMatches,
  }) => {
    const stickElements = [];

    for (let i = 0; i < matches; i++) {
      stickElements.push(<div className="game-board__stick" key={i} />);
    }

    return (
      <div className="game-board">
        <div className="game-board__main">
          <h1 className="game-board__title">🔥Matchstick Game🔥</h1>

          <div className="game-board__settings">
            <h2 className="game-board__settings-title">Initial settings:</h2>
            <div className="game-board__settings-wrapper">
              <p className="game-board__setting">Matches: {initialMatches}</p>
              <p className="game-board__setting">
                Max matches per turn: {matchesPerTurn}
              </p>
              <p className="game-board__setting">
                First move: {isPlayerTurnFirst ? 'You' : 'Opponent'}
              </p>
            </div>
          </div>

          {!isGameOver && (
            <>
              <div className="game-board__stick-container">
                <div className="game-board__stick-wrapper">{stickElements}</div>
              </div>

              <div className="game-board__info">
                <h2>{isPlayerTurn ? 'Your Turn!' : "Opponent's Turn..."}</h2>
                <h2>Matches: {matches}</h2>
              </div>

              <p>Selected Matches: {selectedMatches}</p>

              <input
                type="range"
                min="1"
                max={matchesPerTurn}
                value={selectedMatches}
                onChange={handleSliderChange}
                disabled={!isPlayerTurn}
              />
            </>
          )}

          <div className="game-board__buttons">
            {!isGameOver && (
              <button
                onClick={handleTakeMatches}
                disabled={!isPlayerTurn}
                className={cn('game-board__btn game-board__btn--take', {
                  'game-board__btn--disabled': !isPlayerTurn,
                })}
              >
                Take Matches!
              </button>
            )}

            <div className="game-board__secondary-buttons">
              <button
                className="game-board__btn game-board__btn--restart"
                onClick={handleRestart}
              >
                ↻ RESTART
              </button>

              <Link to="/" className="game-board__btn game-board__btn--back">
                Back to settings
              </Link>
            </div>
          </div>

          {isGameOver && (
            <p className="game-board__result">
              {playerMatches % 2 === 0 ? 'You won!' : 'You lost ;('}
            </p>
          )}
        </div>
      </div>
    );
  }
);
