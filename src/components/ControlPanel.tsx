'use client';

import React, { useState } from 'react';
import { puzzleActions } from '@/redux/features/cell';
import { useDispatch, useSelector } from 'react-redux';
import { selectPuzzleModule } from '@/redux/features/cell/selector';

import styles from './ControlPanel.module.css';
import { generateGrid } from '@/utils/puzzle';
import Popup from './Popup';

interface ControlPanelProps {
  isCompleted: boolean;
  hasErrors: boolean;
}

function ControlPanel({ isCompleted, hasErrors }: ControlPanelProps) {
  const [isPopupOpened, setIspopupOpened] = useState(false);

  const dispatch = useDispatch();

  const handleNewGame = () => {
    const grid = generateGrid();
    window.localStorage.setItem('puzzle', JSON.stringify({ data: grid }));
    dispatch(puzzleActions.init(grid));
  };

  const handleConfirm = () => {
    setIspopupOpened(false);
    dispatch(puzzleActions.reveal());
  };
  return (
    <div>
      {isPopupOpened && <Popup onCancel={() => setIspopupOpened(false)} onConfirm={handleConfirm} />}
      {isCompleted && <p className={styles.win}>PUZZLE SOLVED 👑</p>}
      <div className={styles.container}>
        {!isCompleted && (
          <>
            <button className={styles.button} onClick={() => dispatch(puzzleActions.check())}>
              Check
            </button>
            <button className={styles.button} onClick={() => dispatch(puzzleActions.clear())}>
              Clear
            </button>
            <button className={styles.button} onClick={() => dispatch(puzzleActions.hint())}>
              Hint
            </button>
            <button className={styles.button} onClick={() => setIspopupOpened(true)}>
              Reveal
            </button>
          </>
        )}
      </div>
      <div className={styles.container}>
        <button className={styles.button_new} onClick={handleNewGame}>
          New Puzzle
        </button>
      </div>
      {hasErrors && (
        <div className={styles.container}>
          <button className={styles.button} onClick={() => dispatch(puzzleActions.removeMistakes())}>
            Remove Mistakes
          </button>
        </div>
      )}
    </div>
  );
}

export default ControlPanel;
