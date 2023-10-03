'use client';

import React, { useEffect, useState } from 'react';
import { puzzleActions } from '@/redux/features/cell';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ControlPanel.module.css';
import { generateGrid } from '@/utils/puzzle';

function ControlPanel() {
  const dispatch = useDispatch();

  const handleNewGame = () => {
    const grid = generateGrid();

    dispatch(puzzleActions.init(grid));
  };
  return (
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
  );
}

export default ControlPanel;
