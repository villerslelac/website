import Link from 'next/link';

import { Headband } from './components';
import styles from './not-found.module.scss';

const NotFound = () => {
  return (
    <>
      <Headband title="Page non trouvée" />
      <main className={styles.main}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.desc}>Page non trouvée</h2>
        <Link href="/" className={styles.link}>
          Revenir à l'accueil
        </Link>
      </main>
    </>
  );
};

export default NotFound;
