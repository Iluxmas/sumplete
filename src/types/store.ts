type PuzzleState = CellState[][]

interface CellState {
  value: Number;
  status: 'selected' | 'crossed' | 'none';
  used: Boolean;
}