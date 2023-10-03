import ControlPanel from '@/components/ControlPanel';
import Grid from '../components/Grid';

import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Grid></Grid>
        <ControlPanel></ControlPanel>
      </div>
    </main>
  );
}
