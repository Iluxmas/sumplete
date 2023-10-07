'use client';

import React from 'react';
import { puzzleActions } from '@/redux/features/cell';
import { useDispatch, useSelector } from 'react-redux';
import { selectPuzzleModule } from '@/redux/features/cell/selector';

import styles from './ControlPanel.module.css';

interface ControlPanelProps {
  onNewGame: () => void;
  isCompleted: boolean;
  hasErrors: boolean;
}

function ControlPanel({ onNewGame, isCompleted, hasErrors }: ControlPanelProps) {
  const dispatch = useDispatch();

  return (
    <div>
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
          </>
        )}
        <button className={styles.button_new} onClick={onNewGame}>
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
