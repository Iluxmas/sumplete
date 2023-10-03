'use client';

import React, { useEffect, useState } from 'react';
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
  const [columnAnswer, setColumnAnswer] = useState<ArrayAnswer[]>([]);
  const [rowAnswer, setRowAnswer] = useState<ArrayAnswer[]>([]);
  const dispatch = useDispatch();
  const puzzle = useSelector((state) => selectPuzzleModule(state));

  useEffect(() => {
    const grid = generateGrid();

    dispatch(puzzleActions.init(grid));
  }, []);

  const columnA: ArrayAnswer[] = [];
  const rowA: ArrayAnswer[] = [];

  if (puzzle[0].length) {
    // console.log(puzzle);
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
  // console.log(columnA);

  // setColumnAnswer(column);
  // setRowAnswer(row);

  const handleCellClick = (i, idx) => {
    // const newRow = [...rowAnswer];
    // const newColumn = [...columnAnswer];

    // let rowSum = 0;
    // for (let j = 0; j < puzzle[i].length; j++) {
    //   console.log(puzzle[i][j].status);
    //   if (puzzle[i][j].status != 'crossed') {
    //     rowSum += puzzle[i][j].value;
    //   }
    // }
    // console.log(rowSum);
    // if (rowSum === columnAnswer[idx].value) {
    //   const newColumnState = JSON.parse(JSON.stringify(columnAnswer));
    //   newColumnState[idx].status = 'done';
    //   console.log(newColumnState);
    //   setColumnAnswer(newColumnState);
    // }
    // puzzle[i].forEach((cell) => {});

    dispatch(puzzleActions.cellClick({ row: i, col: idx }));
  };

  return (
    <div className={styles.grid_container}>
      {puzzle?.map((rowData, i) => (
        <div key={i} className={styles.row}>
          {rowData.map((cellData, idx) => (
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
