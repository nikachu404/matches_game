import React from 'react';
import './opponent-player.scss';

type Props = {
  isGameOver: boolean;
  isPlayerTurn: boolean;
  aiPlayerMatches: number;
};

export const OpponentPlayer: React.FC<Props> = ({
  isGameOver,
  isPlayerTurn,
  aiPlayerMatches,
}) => {
  const emoji = isGameOver
    ? aiPlayerMatches % 2 === 0
      ? '🤗'
      : '😔'
    : isPlayerTurn
    ? '😎'
    : '🤔';

  return (
    <div className="opponent-player">
      <div className="opponent-player__container">
        <div className="opponent-player__emoji">{emoji}</div>
        <div className="opponent-player__name">
          <p>Opponent's Matches:</p>
        </div>
        <div className="opponent-player__matches-container">
          {aiPlayerMatches}
        </div>
      </div>
    </div>
  );
};
