'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { puzzleActions } from '@/redux/features/cell';
import { selectPuzzleModule } from '@/redux/features/cell/selector';
import { generateGrid } from '@/utils/puzzle';

import styles from './Grid.module.css';
import Cell from './Cell';

type AnswerStatus = 'done' | 'undone';

interface ArrayAnswer {
  value: number;
  status: AnswerStatus;
}

function Grid() {
  const dispatch = useDispatch();
  const puzzle = useSelector((state) => selectPuzzleModule(state));

  useEffect(() => {
    const grid = generateGrid();

    dispatch(puzzleActions.init(grid));
  }, []);

  const columnA: ArrayAnswer[] = [];
  const rowA: ArrayAnswer[] = [];

  if (puzzle[0].length) {
    for (let i = 0; i < puzzle.length; i++) {
      let rowSum = 0;
      let uncrossedRowSum = 0;
      for (let j = 0; j < puzzle.length; j++) {
        if (puzzle[j][i].used) {
          rowSum += puzzle[j][i].value;
        }
        if (puzzle[j][i].status !== 'crossed') {
          uncrossedRowSum += puzzle[j][i].value;
        }
      }
      rowA.push({ value: rowSum, status: rowSum === uncrossedRowSum ? 'done' : 'undone' });
    }

    for (let singleRow of puzzle) {
      const columnSum = singleRow.reduce((acc, cur) => (cur.used ? acc + cur.value : acc), 0);
      const unCrossedSum = singleRow.reduce((acc, cur) => (cur.status !== 'crossed' ? acc + cur.value : acc), 0);
      columnA.push({ value: columnSum, status: columnSum === unCrossedSum ? 'done' : 'undone' });
    }
  }

  let isCompleted = true;
  // puzzle.every(row => row.every(element => ))
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle.length; j++) {
      if (!puzzle[j][i]?.used && puzzle[j][i]?.status !== 'crossed') {
        isCompleted = false;
      }
    }
  }

  const handleCellClick = useCallback(
    (i: number, idx: number) => {
      if (isCompleted) {
        return;
      }
      dispatch(puzzleActions.cellClick({ row: i, col: idx }));
    },
    [dispatch, isCompleted]
  );

  return (
    <div className={styles.grid_container}>
      {puzzle?.map((rowData: CellState[], i: number) => (
        <div key={i} className={styles.row}>
          {rowData.map((cellData, idx: number) => (
            <Cell key={idx} data={cellData} onCellClick={() => handleCellClick(i, idx)} />
          ))}
          <div key={i} className={[styles.solution, styles[`solution_${columnA[i]?.status}`]].join(' ')}>
            {columnA[i]?.value}
          </div>
        </div>
      ))}
      <div className={styles.row}>
        {rowA.map((el, idx, a) => (
          <div key={idx} className={[styles.solution, styles[`solution_${el.status}`]].join(' ')}>
            {el.value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Grid;
