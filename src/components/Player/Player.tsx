import React from 'react';
import './player.scss';

type Props = {
  isGameOver: boolean;
  isPlayerTurn: boolean;
  playerMatches: number;
};

export const Player: React.FC<Props> = ({
  isGameOver,
  isPlayerTurn,
  playerMatches,
}) => {
  const emoji = isGameOver
    ? playerMatches % 2 === 0
      ? '🤗'
      : '😔'
    : isPlayerTurn
    ? '🤔'
    : '😬';

  return (
    <div className="player">
      <div className="player__container">
        <div className="player__emoji">{emoji}</div>
        <div className="player__name">
          <p>Your Matches: </p>
        </div>
        <div className="player__matches-container">{playerMatches}</div>
      </div>
    </div>
  );
};
