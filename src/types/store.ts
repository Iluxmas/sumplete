export type PuzzleState = CellState[][]

export interface CellState {
  value: number;
  status: 'selected' | 'crossed' | 'none' ;
  used: boolean;
  error: boolean;
}