'use client';

import { useEffect, useRef, useState } from 'react';

import ArrowIcon from '@material-symbols/svg-400/rounded/trending_flat.svg';
import clsx from 'clsx';
import Link from 'next/link';

import styles from './DiscoverCard.module.scss';

interface DiscoverCardProps {
  className?: string;
}

const slides = [
  {
    title: 'Le Saut du Doubs',
    excerpt:
      'Au départ de Villers-le-Lac, le Doubs paresseux serpente au creux d’un val qui s’élargit entre monts et falaises. Les Bassins du Doubs constituent un paysage d’une incroyable beauté, qui voit des falaises de plus de quarante mètres plonger dans les eaux calmes, noires et profondes que sillonnent les bateaux.',
    cover: 'http://via.placeholder.com/1200x630',
  },
  {
    title: 'Le Musée de la Montre',
    excerpt:
      'Le musée de la montre présente les grandes époques de cet indispensable compagnon de l’homme, de ses origines en 1 500 à nos jours.',
    cover: 'http://via.placeholder.com/1200x630',
  },
];

export const DiscoverCard: React.FC<DiscoverCardProps> = ({ className }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNextClick = () => {
    setCurrentIdx((currentIdx + 1) % slides.length);
  };

  const handlePrevClick = () => {
    setCurrentIdx((currentIdx - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(handleNextClick, 5000);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIdx]);

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.card}>
        {slides.map((slide, idx) => (
          <article
            className={styles.item}
            key={idx}
            style={{
              opacity: currentIdx === idx ? 1 : 0,
              zIndex: 1,
            }}
          >
            <Link className={styles.imageLink} href="#">
              {/* eslint-disable @next/next/no-img-element */}
              <img
                className={styles.image}
                src={slide.cover}
                alt={slide.title}
              />
            </Link>
            <div className={styles.content}>
              <header>
                <h3 className={styles.title}>{slide.title}</h3>
              </header>
              <div className={styles.excerpt}>{slide.excerpt}</div>
              <footer className={styles.footer}>
                <Link href="#" className={styles.readMore}>
                  Lire la suite
                </Link>
              </footer>
            </div>
          </article>
        ))}
      </div>
      <button onClick={handlePrevClick} className={styles.prevBtn}>
        <ArrowIcon />
      </button>
      <button onClick={handleNextClick} className={styles.nextBtn}>
        <ArrowIcon />
      </button>
    </div>
  );
};
