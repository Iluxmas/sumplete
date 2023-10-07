import React from 'react';

import styles from './Cell.module.css';
import { CellState } from '@/types/store';

interface CellProps {
  data: CellState;
  onCellClick: () => void;
}

function Cell({ data, onCellClick }: CellProps) {
  const elementClass = [styles.cell, styles[`cell_${data.status}`]];

  if (data.error) {
    elementClass.push(styles.error);
  }

  return (
    <div className={elementClass.join(' ')} onClick={onCellClick}>
      {data.value}
    </div>
  );
}

export default Cell;
