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
      state[payload.row][payload.col].error = false;
    },

    clear: (state) => {
      for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state[i].length; j++) {
          state[i][j].status = 'none';
          state[i][j].error = false;
        }
      }
    },

    check: (state) => {
      for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state[i].length; j++) {
          if ((state[i][j].status === 'crossed' && state[i][j].used) || (state[i][j].status === 'selected' && !state[i][j].used)) {
            state[i][j].error = true;
          }
        }
      }
    },
  
    init: (state, { payload }: PayloadAction<PuzzleState>) => {
      return payload;
    },

    answerClick: (state, {payload}: PayloadAction<{i: number, isColumn: boolean, mark: 'crossed' | 'selected'}>) => {
      for (let j = 0; j < state[payload.i].length; j++) {
        if (payload.isColumn) {
          if (state[payload.i][j].status === 'none') {
            state[payload.i][j].status = payload.mark;
          }
        } else { 
          if (state[j][payload.i].status === 'none') {
            state[j][payload.i].status = payload.mark;
          } 
        }
      }
    },

    hint: (state) => {
      const array = [];

      for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state[i].length; j++) {
          if (!state[i][j].used && state[i][j].status === 'none') {
            array.push([i, j])
          } 
        }
      }

      const [randI, randJ] = array[Math.floor(array.length * Math.random())];

      state[randI][randJ].status = 'crossed';
    },

    reveal: (state) => {
      for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state[i].length; j++) {
          if (state[i][j].used) {
            state[i][j].status = 'selected';
          } else {
            state[i][j].status = 'crossed';
          }
        }
      }
    },

    removeMistakes: (state) => {
      for (let i = 0; i < state.length; i++) {
        for (let j = 0; j < state[i].length; j++) {
          if (state[i][j].error) {
            state[i][j].status = 'none';
            state[i][j].error = false;
          }
        }
      }
    }
  },
});

export const puzzleReducer = puzzleSlice.reducer;
export const puzzleActions = puzzleSlice.actions;
