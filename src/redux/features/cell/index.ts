import { CellState, PuzzleState } from '@/types/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: PuzzleState = [[]];

interface CellClickPayload {
  row: number;
  col: number;
}

export const puzzleSlice = createSlice({
  name: 'puzzle',
  initialState,
  reducers: {
    cellClick: (state, { payload }: PayloadAction<CellClickPayload>) => {
      if (state[payload.row][payload.col].status === 'none') {
        state[payload.row][payload.col].status = 'crossed';
      } else if (state[payload.row][payload.col].status === 'crossed') {
        state[payload.row][payload.col].status = 'selected';
      } else if (state[payload.row][payload.col].status === 'selected') {
        state[payload.row][payload.col].status = 'none';
      }
    },
    init: (state, { payload }: PayloadAction<PuzzleState>) => {
      // what should i write here?
      return payload;
    },
  },
});

export const puzzleReducer = puzzleSlice.reducer;
export const puzzleActions = puzzleSlice.actions;
