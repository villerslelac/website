import { Link } from '@remix-run/react';
import clsx from 'clsx';

import { Button } from '../Button/Button';
import styles from './TourismCard.module.scss';

interface TourismCardProps {
  className?: string;
}

export const TourismCard: React.FC<TourismCardProps> = ({ className }) => {
  return (
    <div className={clsx(className, styles.card)}>
      <div className={styles.image}>
        <img src="/tourism.jpg" alt="Tourisme" width={1136} height={754} />
      </div>
      <div className={styles.content}>
        <div className={styles.links}>
          <Link
            to="/decouvrir-villers-le-lac/le-saut-du-doubs"
            className={styles.link}
          >
            Le saut du Doubs
          </Link>
          <Link
            to="/decouvrir-villers-le-lac/le-musee-de-la-montre"
            className={styles.link}
          >
            Le musée de la Montre
          </Link>
          <Link
            to="/decouvrir-villers-le-lac/fruitiere-a-comte"
            className={styles.link}
          >
            Fruitière à Comté
          </Link>
          <Link
            to="/decouvrir-villers-le-lac/villers-le-lac-aux-4-eglises"
            className={styles.link}
          >
            Villers-le-Lac aux 4 églises
          </Link>
          <Link
            to="/decouvrir-villers-le-lac/loisirs-et-activites"
            className={styles.link}
          >
            Loisirs et activités
          </Link>
        </div>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>
            Séjourner
            <br />
            <span>à Villers-le-Lac</span>
          </h2>
          <Button
            as={Link}
            to="/decouvrir-villers-le-lac/sejourner-a-villers-le-lac"
            variant="secondary"
          >
            En savoir plus
          </Button>
        </div>
      </div>
    </div>
  );
};
