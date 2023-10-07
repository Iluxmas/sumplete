'use client';

import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { puzzleActions } from '@/redux/features/cell';
import { CellState, PuzzleState } from '@/types/store';
import Cell from './Cell';

import styles from './Grid.module.css';

type AnswerStatus = 'done' | 'undone';

interface ArrayAnswer {
  value: number;
  status: AnswerStatus;
}
interface GridProps {
  puzzle: PuzzleState;
  isCompleted: boolean;
}
function Grid({ puzzle, isCompleted }: GridProps) {
  const dispatch = useDispatch();

  if (puzzle) {
    localStorage.setItem('puzzle', JSON.stringify({ data: puzzle }));
  }

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

  const handleCellClick = useCallback(
    (i: number, idx: number) => {
      if (isCompleted) {
        return;
      }
      dispatch(puzzleActions.cellClick({ row: i, col: idx }));
    },
    [dispatch, isCompleted]
  );

  const handleAnswerClick = (index: number, isColumn = false) => {
    let crossedCount = 0;
    let selectedCount = 0;
    let noneCount = 0;

    if (isColumn) {
      for (let i = 0; i < puzzle[index].length; i++) {
        if (puzzle[index][i].status === 'crossed') {
          crossedCount += puzzle[index][i].value;
        }
        if (puzzle[index][i].status === 'selected') {
          selectedCount += puzzle[index][i].value;
        }
        if (puzzle[index][i].status === 'none') {
          noneCount += puzzle[index][i].value;
        }
      }

      if (selectedCount === columnA[index].value) {
        dispatch(puzzleActions.answerClick({ i: index, isColumn: isColumn, mark: 'crossed' }));
      } else if (selectedCount + noneCount === columnA[index].value) {
        dispatch(puzzleActions.answerClick({ i: index, isColumn: isColumn, mark: 'selected' }));
      }
    } else {
      for (let i = 0; i < puzzle[index].length; i++) {
        if (puzzle[i][index].status === 'crossed') {
          crossedCount += puzzle[i][index].value;
        }
        if (puzzle[i][index].status === 'selected') {
          selectedCount += puzzle[i][index].value;
        }
        if (puzzle[i][index].status === 'none') {
          noneCount += puzzle[i][index].value;
        }
      }

      if (selectedCount === rowA[index].value) {
        dispatch(puzzleActions.answerClick({ i: index, isColumn: isColumn, mark: 'crossed' }));
      } else if (selectedCount + noneCount === rowA[index].value) {
        dispatch(puzzleActions.answerClick({ i: index, isColumn: isColumn, mark: 'selected' }));
      }
    }
  };

  return (
    <div className={styles.grid_container}>
      {puzzle?.map((rowData: CellState[], i: number) => (
        <div key={i} className={styles.row}>
          {rowData.map((cellData, idx: number) => (
            <Cell key={idx} data={cellData} onCellClick={() => handleCellClick(i, idx)} />
          ))}
          <div
            key={i}
            className={[styles.solution, styles[`solution_${columnA[i]?.status}`]].join(' ')}
            onClick={() => handleAnswerClick(i, true)}
          >
            {columnA[i]?.value}
          </div>
        </div>
      ))}
      <div className={styles.row}>
        {rowA.map((el, idx, a) => (
          <div
            key={idx}
            className={[styles.solution, styles[`solution_${el.status}`]].join(' ')}
            onClick={() => handleAnswerClick(idx, false)}
          >
            {el.value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Grid;
