'use client';

import { useSelector } from 'react-redux';
import { selectPuzzleModule } from '@/redux/features/cell/selector';
import ControlPanel from '@/components/ControlPanel';
import Grid from '@/components/Grid';
import { PuzzleState } from '@/types/store';

import styles from './page.module.css';

export default function Home() {
  const puzzle = useSelector((state: { puzzle: PuzzleState }) => selectPuzzleModule(state));

  let isCompleted = true;
  let hasErrors = false;

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

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Grid puzzle={puzzle} isCompleted={isCompleted}></Grid>
        <ControlPanel isCompleted={isCompleted} hasErrors={hasErrors}></ControlPanel>
      </div>
    </main>
  );
}
