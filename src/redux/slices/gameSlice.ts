import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface GameState {
  matches: number;
  matchesPerTurn: number;
  isPlayerTurn: boolean;
}

const initialState: GameState = {
  matches: 25,
  matchesPerTurn: 3,
  isPlayerTurn: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setMatches: (state, action: PayloadAction<number>) => {
      state.matches = action.payload;
    },
    setMatchesPerTurn: (state, action: PayloadAction<number>) => {
      state.matchesPerTurn = action.payload;
    },
    setIsPlayerTurn: (state, action: PayloadAction<boolean>) => {
      state.isPlayerTurn = action.payload;
    },
  },
});

export const gameReducer = gameSlice.reducer;
export const { setMatches, setMatchesPerTurn, setIsPlayerTurn } =
  gameSlice.actions;

export const selectMatches = (state: RootState) => state.game.matches;
export const selectMatchesPerTurn = (state: RootState) =>
  state.game.matchesPerTurn;
export const selectIsPlayerTurn = (state: RootState) => state.game.isPlayerTurn;
