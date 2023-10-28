'use client';

import EventIcon from '@material-symbols/svg-400/rounded/location_on-fill.svg';
import clsx from 'clsx';
import Link from 'next/link';

import styles from './Event.module.scss';

interface EventProps {
  title: string;
  size?: 'lg';
  className?: string;
}

export const Event: React.FC<EventProps> = ({ title, size, className }) => (
  <div
    className={clsx(size == 'lg' ? styles.largeEvent : styles.event, className)}
  >
    <Link className={styles.imageLink} href="#">
      <div className={styles.date}>
        <span className={styles.dateDay}>25</span>
        <span className={styles.dateMonth}>Oct.</span>
      </div>
      {/* eslint-disable @next/next/no-img-element */}
      {size == 'lg' ? (
        <img
          className={styles.image}
          src="http://via.placeholder.com/1000x1414"
          alt="Image de test"
        />
      ) : null}
    </Link>
    <Link className={styles.content} href="#">
      <h3 className={styles.title}>{title}</h3>
      {size == 'lg' ? (
        <div className={styles.excerpt}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          faucibus et lorem sit amet lobortis. Quisque et quam diam. Aenean
          porta semper ex, ut viverra nisi venenatis eu.
        </div>
      ) : null}
      <footer className={styles.meta}>
        <EventIcon className={styles.icon} />
        Salle des fêtes de Villers-le-Lac
      </footer>
    </Link>
  </div>
);
