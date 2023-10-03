import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query';
import { puzzleReducer } from './features/cell'

export const store = configureStore({
  reducer: {
    puzzle: puzzleReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})
setupListeners(store.dispatch);