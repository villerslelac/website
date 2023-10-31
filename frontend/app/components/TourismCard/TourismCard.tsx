'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '../Button/Button';
import styles from './TourismCard.module.scss';

interface TourismCardProps {
  className?: string;
}

export const TourismCard: React.FC<TourismCardProps> = ({ className }) => {
  return (
    <div className={clsx(className, styles.card)}>
      <div className={styles.image}>
        <Image src="/tourism.jpg" alt="Tourisme" width={1136} height={754} />
      </div>
      <div className={styles.content}>
        <div className={styles.links}>
          <Link href="#" className={styles.link}>
            Le saut du Doubs
          </Link>
          <Link href="#" className={styles.link}>
            Le musée de la Montre
          </Link>
          <Link href="#" className={styles.link}>
            Fruitière à Comté
          </Link>
          <Link href="#" className={styles.link}>
            Villers-le-Lac aux 4 églises
          </Link>
          <Link href="#" className={styles.link}>
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
            href="#"
            variant="secondary"
            className={styles.button}
          >
            En savoir plus
          </Button>
        </div>
      </div>
    </div>
  );
};
