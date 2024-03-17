'use client';

import clsx from 'clsx';
import Link from 'next/link';

import { Button } from '../Button/Button';
import styles from './InteractiveMapCard.module.scss';

interface InteractiveMapCardProps {
  className?: string;
}

export const InteractiveMapCard: React.FC<InteractiveMapCardProps> = ({
  className,
}) => {
  return (
    <div className={clsx(className, styles.card)}>
      <div className={styles.content}>
        <h2 className={styles.title}>Carte interactive</h2>
        <Button
          as={Link}
          href="/carte-interactive"
          variant="secondary"
          className={styles.button}
        >
          Voir la carte interactive
        </Button>
      </div>
    </div>
  );
};
