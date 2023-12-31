import { CellState, PuzzleState } from '@/types/store';

const getLimit = () => {
  return [0.3, 0.4, 0.5, 0.6, 0.7][Math.floor(Math.random() * 5)];
};

const generateItem = (): CellState => {
  const limit = getLimit();

  return {
    value: 1 + Math.floor(Math.random() * 9),
    status: 'none',
    used: Math.random() > limit ? true : false,
    error: false,
  };
};

const generateRow = (): CellState[] =>
  Array(8)
    .fill(1)
    .map((_) => generateItem());

export const generateGrid = (): PuzzleState => {
  const puz = [];
  for (let i = 0; i < 8; i++) {
    const row = generateRow();
    puz.push(row);
  }
  return puz;
};
