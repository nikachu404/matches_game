import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectMatchesPerTurn,
  setMatchesPerTurn,
} from '../../redux/slices/gameSlice';
import './matches-per-turn-input.scss';

export const MatchesPerTurnInput: React.FC = () => {
  const matchesPerTurn = useAppSelector(selectMatchesPerTurn);
  const [matchesPerTurnInputValue, setMatchesPerTurnInputValue] =
    useState(matchesPerTurn);
  const dispatch = useAppDispatch();

  const handleMatchesPerTurnChange = () => {
    if (matchesPerTurnInputValue >= 3 && matchesPerTurnInputValue <= 10) {
      dispatch(setMatchesPerTurn(matchesPerTurnInputValue));
    } else {
      setMatchesPerTurnInputValue(matchesPerTurn);
      toast.error('Please enter a number between 3 and 10');
    }
  };

  return (
    <div className="matches-per-turn-input__block">
      <label className="matches-per-turn-input__label">
        Number of Matches Per Turn:
        <input
          type="number"
          min="3"
          max="10"
          value={matchesPerTurnInputValue || ''}
          className="matches-per-turn-input__input"
          onChange={(e) => setMatchesPerTurnInputValue(+e.target.value)}
          onBlur={handleMatchesPerTurnChange}
        />
      </label>
    </div>
  );
};
