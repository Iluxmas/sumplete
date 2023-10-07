'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { puzzleActions } from '@/redux/features/cell';
import { generateGrid } from '@/utils/puzzle';
import Spinner from '@/components/Spinner';
import { PuzzleState } from '@/types/store';

import styles from './page.module.css';

export default function Home() {
  const [savedPuzzle, setSavedPuzzle] = useState<PuzzleState | null>(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const savedPuzzle = localStorage.getItem('puzzle');

    if (savedPuzzle) {
      const parsed = JSON.parse(savedPuzzle);
      setSavedPuzzle(parsed.data);
    }

    setLoading(false);
  }, []);

  const handleNewGame = () => {
    const grid = generateGrid();

    dispatch(puzzleActions.init(grid));
    router.push('/game', { scroll: false });
  };

  const handleContinueGame = () => {
    if (!savedPuzzle) return;

    dispatch(puzzleActions.init(savedPuzzle));
    router.push('/game', { scroll: false });
  };

  return (
    <main className={styles.main}>
      <div className={styles.header_container}>
        <h2 className={styles.subheader}>Welcome to</h2>
        <h1 className={styles.header}>Sumplete</h1>
        <h2 className={styles.subheader}>game</h2>
      </div>
      <div className={styles.button_container}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            {!!savedPuzzle && (
              <button className={styles.button} onClick={handleContinueGame}>
                Continue saved game
              </button>
            )}
            <button className={styles.button} onClick={handleNewGame}>
              New Game
            </button>
          </>
        )}
      </div>
    </main>
  );
}
