import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectIsPlayerTurn,
  setIsPlayerTurn,
} from '../../redux/slices/gameSlice';
import './player-turn-input.scss';

export const PlayerTurnInput: React.FC = () => {
  const isPlayerTurn = useAppSelector(selectIsPlayerTurn);
  const dispatch = useAppDispatch();
  const [isPlayerTurnFirst, setIsPlayerTurnFirst] = useState(isPlayerTurn);

  const handlePlayerTurnChange = (isPlayerTurn: boolean) => {
    setIsPlayerTurnFirst(isPlayerTurn);
    dispatch(setIsPlayerTurn(isPlayerTurn));
  };

  return (
    <div className="player-turn-input__block">
      <label className="player-turn-input__label">First Move:</label>
      <label className="player-turn-input__radio-label">
        <input
          type="radio"
          checked={isPlayerTurnFirst}
          className="player-turn-input__radiobutton"
          onChange={() => handlePlayerTurnChange(true)}
        />
        You👹
      </label>

      <label className="player-turn-input__radio-label">
        <input
          type="radio"
          checked={!isPlayerTurnFirst}
          className="player-turn-input__radiobutton"
          onChange={() => handlePlayerTurnChange(false)}
        />
        Opponent👺
      </label>
    </div>
  );
};
