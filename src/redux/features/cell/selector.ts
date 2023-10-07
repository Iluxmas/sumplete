import { PuzzleState } from '@/types/store';

export const selectPuzzleModule = (state: {puzzle: PuzzleState}): PuzzleState  => state.puzzle;

// export const selectProductCount = (state: State, id: string) =>
// selectPuzzleModule(state)[id] || 0;
