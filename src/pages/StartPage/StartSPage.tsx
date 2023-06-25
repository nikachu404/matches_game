import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
  selectIsPlayerTurn,
  selectMatches,
  selectMatchesPerTurn,
  setIsPlayerTurn,
  setMatches,
  setMatchesPerTurn,
} from '../../redux/slices/gameSlice';
import { toast } from 'react-toastify';
import './start-page.scss';

export const StartPage: React.FC = () => {
  const matches = useAppSelector(selectMatches);
  const matchesPerTurn = useAppSelector(selectMatchesPerTurn);
  const isPlayerTurn = useAppSelector(selectIsPlayerTurn);
  const dispatch = useAppDispatch();

  const [isPlayerTurnFirst, setIsPlayerTurnFirst] = useState(isPlayerTurn);
  const [matchesInputValue, setMatchesInputValue] = useState(matches);
  const [matchesPerTurnInputValue, setMatchesPerTurnInputValue] =
    useState(matchesPerTurn);

  const handlePlayerTurnChange = (isPlayerTurn: boolean) => {
    setIsPlayerTurnFirst(isPlayerTurn);
    dispatch(setIsPlayerTurn(isPlayerTurn));
  };

  const handleMatchesChange = () => {
    if (
      matchesInputValue >= 11 &&
      matchesInputValue <= 51 &&
      matchesInputValue % 2 !== 0
    ) {
      dispatch(setMatches(matchesInputValue));
    } else {
      setMatchesInputValue(matches);
    }

    if (matchesInputValue < 11 || matchesInputValue > 51) {
      toast.error('Please enter a number between 11 and 51');
    }

    if (matchesInputValue % 2 === 0) {
      toast.error('Please enter an odd number');
    }
  };

  const handleMatchesPerTurnChange = () => {
    if (matchesPerTurnInputValue >= 3 && matchesPerTurnInputValue <= 10) {
      dispatch(setMatchesPerTurn(matchesPerTurnInputValue));
    } else {
      setMatchesPerTurnInputValue(matchesPerTurn);
      toast.error('Please enter a number between 3 and 10');
    }
  };

  return (
    <div className="start-page">
      <div className="start-page__main">
        <h2 className="start-page__title">🔥Matchstick Game🔥</h2>

        <div className="start-page__block">
          <label className="start-page__label">
            Number of Matches:
            <input
              type="number"
              step="2"
              min="11"
              max="51"
              value={matchesInputValue || ''}
              className="start-page__input"
              onChange={(e) => setMatchesInputValue(+e.target.value)}
              onBlur={handleMatchesChange}
            />
          </label>
        </div>

        <div className="start-page__block">
          <label className="start-page__label">
            Number of Matches Per Turn:
            <input
              type="number"
              min="3"
              max="10"
              value={matchesPerTurnInputValue || ''}
              className="start-page__input"
              onChange={(e) => setMatchesPerTurnInputValue(+e.target.value)}
              onBlur={handleMatchesPerTurnChange}
            />
          </label>
        </div>

        <div className="start-page__block">
          <label className="start-page__label">First Move:</label>
          <label className="start-page__radio-label">
            <input
              type="radio"
              checked={isPlayerTurnFirst}
              className="start-page__radiobutton"
              onChange={() => handlePlayerTurnChange(true)}
            />
            You👹
          </label>

          <label className="start-page__radio-label">
            <input
              type="radio"
              checked={!isPlayerTurnFirst}
              className="start-page__radiobutton"
              onChange={() => handlePlayerTurnChange(false)}
            />
            Opponent👺
          </label>
        </div>

        <Link to="/game" className="start-page__start-btn">
          Start
        </Link>
      </div>
    </div>
  );
};
