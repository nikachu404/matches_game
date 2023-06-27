import React from 'react';
import { Link } from 'react-router-dom';
import './start-page.scss';
import {
  MatchesInput,
  MatchesPerTurnInput,
  PlayerTurnInput,
} from '../../components';

export const StartPage: React.FC = () => {
  return (
    <div className="start-page">
      <div className="start-page__main">
        <h2 className="start-page__title">🔥Matchstick Game🔥</h2>

        <MatchesInput />

        <MatchesPerTurnInput />

        <PlayerTurnInput />

        <Link to="/game" className="start-page__start-btn">
          Start
        </Link>
      </div>
    </div>
  );
};
