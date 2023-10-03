'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { puzzleActions } from '@/redux/features/cell';
import { selectPuzzleModule } from '@/redux/features/cell/selector';
import { generateGrid } from '@/utils/puzzle';

import styles from './Grid.module.css';

type AnswerStatus = 'done' | 'undone';

interface ArrayAnswer {
  value: number;
  status: AnswerStatus;
}

function Grid() {
  const [columnAnswer, setColumnAnswer] = useState<ArrayAnswer[]>([]);
  const [rowAnswer, setRowAnswer] = useState<ArrayAnswer[]>([]);
  const dispatch = useDispatch();
  const puzzle = useSelector((state) => selectPuzzleModule(state));

  useEffect(() => {
    const grid = generateGrid();

    const column: ArrayAnswer[] = [];
    const row: ArrayAnswer[] = [];

    for (let i = 0; i < grid.length; i++) {
      let rowSum = 0;
      for (let j = 0; j < grid.length; j++) {
        if (grid[j][i].used) {
          rowSum += grid[j][i].value;
        }
      }
      row.push({ value: rowSum, status: 'undone' });
    }

    for (let singleRow of grid) {
      let columnSum = singleRow.reduce((acc, cur) => (cur.used ? acc + cur.value : acc), 0);
      column.push({ value: columnSum, status: 'undone' });
    }

    setColumnAnswer(column);
    setRowAnswer(row);
    dispatch(puzzleActions.init(grid));
  }, []);

  const handleCellClick = (i, idx) => {
    const newRow = [...rowAnswer];
    const newColumn = [...columnAnswer];
    ``;
    let rowSum = 0;
    for (let j = 0; j < puzzle[i].length; j++) {
      console.log(puzzle[i][j].status);
      if (puzzle[i][j].status != 'crossed') {
        rowSum += puzzle[i][j].value;
      }
    }
    console.log(rowSum);
    if (rowSum === columnAnswer[idx].value) {
      const newColumnState = JSON.parse(JSON.stringify(columnAnswer));
      newColumnState[idx].status = 'done';
      console.log(newColumnState);
      setColumnAnswer(newColumnState);
    }
    // puzzle[i].forEach((cell) => {});

    dispatch(puzzleActions.cellClick({ row: i, col: idx }));
  };

  return (
    <>
      {puzzle?.map((rowData, i) => (
        <div key={i} className={styles.row}>
          {rowData.map((cellData, idx) => (
            <div
              key={idx}
              className={[styles.cell, styles[`cell_${cellData.status}`]].join(' ')}
              onClick={() => handleCellClick(i, idx)}
            >
              {cellData.value}
            </div>
          ))}
          <div key={i} className={styles.solution}>
            {columnAnswer[i]?.value}
          </div>
        </div>
      ))}
      <div className={styles.row}>
        {rowAnswer.map((el, idx, a) => (
          <div key={idx} className={[styles.solution, styles[`cell_${el.status}`]].join(' ')}>
            {el.value}
          </div>
        ))}
      </div>
    </>
  );
}

export default Grid;
