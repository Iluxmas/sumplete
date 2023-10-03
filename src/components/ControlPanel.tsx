'use client';

import React, { useEffect, useState } from 'react';
import { puzzleActions } from '@/redux/features/cell';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ControlPanel.module.css';
import { generateGrid } from '@/utils/puzzle';
import { selectPuzzleModule } from '@/redux/features/cell/selector';

function ControlPanel() {
  const dispatch = useDispatch();
  const puzzle = useSelector((state) => selectPuzzleModule(state));

  const handleNewGame = () => {
    const grid = generateGrid();
    dispatch(puzzleActions.init(grid));
  };

  let isCompleted = true;
  // puzzle.every(row => row.every(element => ))
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle.length; j++) {
      if (!puzzle[j][i]?.used && puzzle[j][i]?.status !== 'crossed') {
        isCompleted = false;
      }
    }
  }

  return (
    <div>
      <div className={styles.container}>
        <button className={styles.button} onClick={() => dispatch(puzzleActions.check())}>
          Check
        </button>
        <button className={styles.button} onClick={() => dispatch(puzzleActions.clear())}>
          Clear
        </button>
        {/* <button className={styles.button}></button> */}
        <button className={styles.button} onClick={handleNewGame}>
          New Puzzle
        </button>
      </div>
      {isCompleted && <p className={styles.win}>YOU WIN 👑</p>}
    </div>
  );
}

export default ControlPanel;
