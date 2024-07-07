import { Link } from '@remix-run/react';
import clsx from 'clsx';

import styles from './Headband.module.scss';

interface HeadbandProps {
  title: React.ReactNode;
  breadcrumb?: {
    link: string;
    label: string;
  }[];
  className?: string;
}

export const Headband = ({ title, breadcrumb, className }: HeadbandProps) => (
  <div className={clsx(styles.headband, className)}>
    {breadcrumb && breadcrumb.length > 0 ? (
      <ul className={styles.breadcrumb}>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        {breadcrumb.map(({ link, label }, idx) => (
          <li key={idx}>
            <Link to={link}>{label}</Link>
          </li>
        ))}
      </ul>
    ) : null}
    <h1>{title}</h1>
  </div>
);
