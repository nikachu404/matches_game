import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectMatches, setMatches } from '../../redux/slices/gameSlice';
import './matches-input.scss';

export const MatchesInput: React.FC = () => {
  const matches = useAppSelector(selectMatches);
  const [matchesInputValue, setMatchesInputValue] = useState(matches);
  const dispatch = useAppDispatch();

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

  return (
    <div className="smatches-input__block">
      <label className="matches-input__label">
        Number of Matches:
        <input
          type="number"
          step="2"
          min="11"
          max="51"
          value={matchesInputValue || ''}
          className="matches-input__input"
          onChange={(e) => setMatchesInputValue(+e.target.value)}
          onBlur={handleMatchesChange}
        />
      </label>
    </div>
  );
};
