import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { GameBoard, OpponentPlayer, Player } from '../../components';
import {
  selectIsPlayerTurn,
  selectMatches,
  selectMatchesPerTurn,
} from '../../redux/slices/gameSlice';

interface GameState {
  isPlayerTurn: boolean;
  isGameOver: boolean;
  playerMatches: number;
  aiPlayerMatches: number;
  selectedMatches: number;
}

export const GamePage: React.FC = () => {
  const matches = useAppSelector(selectMatches);
  const matchesPerTurn = useAppSelector(selectMatchesPerTurn);
  const isPlayerTurnFirst = useAppSelector(selectIsPlayerTurn);

  const [gameMatches, setGameMatches] = useState(matches);

  const [gameState, setGameState] = useState<GameState>({
    isPlayerTurn: true,
    isGameOver: false,
    playerMatches: 0,
    aiPlayerMatches: 0,
    selectedMatches: 1,
  });

  const handleTakeMatches = () => {
    const { isPlayerTurn, selectedMatches, playerMatches } = gameState;

    if (!gameState.isGameOver && isPlayerTurn && selectedMatches <= gameMatches) {
      const remainingMatches = gameMatches - selectedMatches;
      setGameMatches(remainingMatches >= 0 ? remainingMatches : 0);

      setGameState((prevState) => ({
        ...prevState,
        playerMatches: playerMatches + selectedMatches,
        isPlayerTurn: false,
        selectedMatches: 1,
      }));
    }
  };

  const makeAITurn = () => {
    const { aiPlayerMatches } = gameState;

    let aiMatches = 1;

    if (matches % 2 !== 0) {
      if (aiPlayerMatches % 2 === 0) {
        const possibleMatches = Math.min(matchesPerTurn, matches);
        aiMatches =
          possibleMatches % 2 === 0 ? possibleMatches : possibleMatches - 1;
      } else {
        aiMatches = Math.min(1, matches);
      }
    } else {
      aiMatches = Math.min(matchesPerTurn, matches);
    }

    const maxAIMatches = Math.min(aiMatches, gameMatches);

    setGameMatches((prevMatches) => prevMatches - maxAIMatches);
    setGameState((prevState) => ({
      ...prevState,
      aiPlayerMatches: aiPlayerMatches + maxAIMatches,
      isPlayerTurn: true,
    }));
  };

  const handleRestart = () => {
    const initialGameState: GameState = {
      isPlayerTurn: isPlayerTurnFirst,
      isGameOver: false,
      playerMatches: 0,
      aiPlayerMatches: 0,
      selectedMatches: 1,
    };

    setGameState(initialGameState);
    setGameMatches(matches);
  };

  useEffect(() => {
    const { isPlayerTurn, isGameOver: gameOver } = gameState;

    if (!gameOver && !isPlayerTurn && matches > 0) {
      const delay = setTimeout(() => {
        makeAITurn();
      }, 3000);
      return () => clearTimeout(delay);
    }
  }, [gameState.isPlayerTurn, gameState.isGameOver, matches]);

  useEffect(() => {
    if (gameMatches === 0) {
      setGameState((prevState) => ({ ...prevState, isGameOver: true }));
    }
  }, [gameMatches]);

  useEffect(() => {
    setGameState((prevState) => ({
      ...prevState,
      isPlayerTurn: isPlayerTurnFirst,
    }));
  }, [isPlayerTurnFirst]);

  useEffect(() => {
    setGameMatches(matches);
  }, [matches]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedMatches = Number(event.target.value);
    setGameState((prevState) => ({ ...prevState, selectedMatches }));
  };

  const {
    isPlayerTurn,
    isGameOver,
    playerMatches,
    aiPlayerMatches,
    selectedMatches,
  } = gameState;

  return (
    <div className="game-page">
      <GameBoard
        matches={gameMatches}
        initialMatches={matches}
        isPlayerTurn={isPlayerTurn}
        isPlayerTurnFirst={isPlayerTurnFirst}
        selectedMatches={selectedMatches}
        matchesPerTurn={matchesPerTurn}
        handleSliderChange={handleSliderChange}
        handleTakeMatches={handleTakeMatches}
        handleRestart={handleRestart}
        isGameOver={isGameOver}
        playerMatches={playerMatches}
      />

      <div className="players">
        <OpponentPlayer
          isGameOver={isGameOver}
          isPlayerTurn={isPlayerTurn}
          aiPlayerMatches={aiPlayerMatches}
        />

        <Player
          isGameOver={isGameOver}
          isPlayerTurn={isPlayerTurn}
          playerMatches={playerMatches}
        />
      </div>
    </div>
  );
};
