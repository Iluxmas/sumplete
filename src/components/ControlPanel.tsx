'use client';

import React, { useState } from 'react';
import { puzzleActions } from '@/redux/features/cell';
import { useDispatch, useSelector } from 'react-redux';
import { selectPuzzleModule } from '@/redux/features/cell/selector';

import styles from './ControlPanel.module.css';
import { generateGrid } from '@/utils/puzzle';
import Popup from './Popup';
import Button from './Button';

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
      {isCompleted && <p className={styles.win}>👑 PUZZLE SOLVED 👑</p>}
      {!isCompleted && (
        <div className={styles.container}>
          <Button clickHandler={() => dispatch(puzzleActions.check())} text='Check' />
          <Button clickHandler={() => dispatch(puzzleActions.clear())} text='Clear' />
          <Button clickHandler={() => dispatch(puzzleActions.hint())} text='Hint' />
          <Button clickHandler={() => setIspopupOpened(true)} text='Reveal' />
        </div>
      )}
      {hasErrors && (
        <div className={styles.container}>
          <Button clickHandler={() => dispatch(puzzleActions.removeMistakes())} text='Remove Mistakes' />
        </div>
      )}
      <div className={styles.container}>
        <Button clickHandler={handleNewGame} text='New Puzzle' type='action' />
      </div>
    </div>
  );
}

export default ControlPanel;
