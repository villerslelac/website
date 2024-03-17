import clsx from 'clsx';

import styles from './Spinner.module.scss';

interface SpinnerProps {
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ className, ...props }) => (
  <div className={clsx(styles.spinner, className)} {...props} />
);
