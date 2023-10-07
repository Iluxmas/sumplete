'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPuzzleModule } from '@/redux/features/cell/selector';
import { puzzleActions } from '@/redux/features/cell';
import ControlPanel from '@/components/ControlPanel';
import Grid from '@/components/Grid';
import { generateGrid } from '@/utils/puzzle';

import styles from './page.module.css';

export default function Home() {
  const dispatch = useDispatch();
  const puzzle = useSelector((state) => selectPuzzleModule(state));

  useEffect(() => {
    // const savedPuzzle = localStorage.getItem('puzzle');
    // if (savedPuzzle) {
    //   const parsed = JSON.parse(savedPuzzle);
    //   dispatch(puzzleActions.init(parsed.data));
    // } else {
    //   const grid = generateGrid();
    //   localStorage.setItem('puzzle', JSON.stringify({ data: grid }));
    //   dispatch(puzzleActions.init(grid));
    // }
  }, []);

  let isCompleted = true;
  let hasErrors = false;
  // puzzle.every(row => row.every(element => ))
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle.length; j++) {
      if (!puzzle[j][i]?.used && puzzle[j][i]?.status !== 'crossed') {
        isCompleted = false;
      }
      if (puzzle[j][i]?.error) {
        hasErrors = true;
      }
    }
  }

  const handleNewGame = () => {
    const grid = generateGrid();

    localStorage.setItem('puzzle', JSON.stringify({ data: grid }));
    dispatch(puzzleActions.init(grid));
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Grid puzzle={puzzle} isCompleted={isCompleted}></Grid>
        <ControlPanel onNewGame={handleNewGame} isCompleted={isCompleted} hasErrors={hasErrors}></ControlPanel>
      </div>
    </main>
  );
}
