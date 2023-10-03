import { State } from '@/types/store';

export const selectPuzzleModule = (state: State) => state.puzzle;

// export const selectProductCount = (state: State, id: string) =>
// selectPuzzleModule(state)[id] || 0;
