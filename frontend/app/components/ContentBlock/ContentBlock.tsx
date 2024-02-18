import clsx from 'clsx';

import styles from './ContentBlock.module.scss';

interface ContentBlockProps {
  html: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const ContentBlock = ({
  html,
  size = 'md',
  className,
}: ContentBlockProps) => (
  <div
    className={clsx(styles.content, size == 'sm' && styles.small, className)}
    dangerouslySetInnerHTML={{ __html: html }}
  />
);
