import { useEffect, useRef, useState } from 'react';

import ArrowIcon from '@material-symbols/svg-400/rounded/trending_flat.svg';
import { Link } from '@remix-run/react';
import clsx from 'clsx';

import styles from './DiscoverCard.module.scss';

interface DiscoverCardProps {
  className?: string;
}

const slides = [
  {
    title: 'Le Saut du Doubs',
    excerpt:
      'Au départ de Villers-le-Lac, le Doubs paresseux serpente au creux d’un val qui s’élargit entre monts et falaises. Les Bassins du Doubs constituent un paysage d’une incroyable beauté, qui voit des falaises de plus de quarante mètres plonger dans les eaux calmes, noires et profondes que sillonnent les bateaux.',
    cover: '/decouvrir-villers-le-lac/le-saut-du-doubs.jpg',
    link: '/decouvrir-villers-le-lac/le-saut-du-doubs',
  },
  {
    title: 'Le Musée de la Montre',
    excerpt:
      'Le musée de la montre présente les grandes époques de cet indispensable compagnon de l’homme, de ses origines en 1 500 à nos jours.',
    cover: '/decouvrir-villers-le-lac/le-musee-de-la-montre.jpg',
    link: '/decouvrir-villers-le-lac/le-musee-de-la-montre',
  },
  {
    title: 'Fruitière à Comté',
    excerpt:
      'La fruitière à comté de Villers-le-Lac fut créée en 1870. Très tôt, les agriculteurs de notre village eurent l’idée de se regrouper pour fonder une coopérative.',
    cover: '/decouvrir-villers-le-lac/fruitiere-a-comte.jpg',
    link: '/decouvrir-villers-le-lac/fruitiere-a-comte',
  },
  {
    title: 'Villers-le-Lac aux 4 églises',
    excerpt:
      'Villers-le-Lac compte 4 églises : l’église Saint Jean au centre ville, la chapelle Saint Joseph des Bassots, l’église Saint François de Sales au Chauffaud et Notre Dame des Neiges au Pissoux.',
    cover: '/decouvrir-villers-le-lac/villers-le-lac-aux-4-eglises.jpg',
    link: '/decouvrir-villers-le-lac/villers-le-lac-aux-4-eglises',
  },
  {
    title: 'Loisirs et activités',
    excerpt:
      'Hiver comme été, venez découvrir les différentes activités à pratiquer seul ou en famille à Villers-le-lac au coeur des Montagnes du Jura : ski alpin, ski de fond, sorties raquettes, balades en traineau à chiens, randonnée, VTT, ski nautique, canoë, pêche',
    cover: '/decouvrir-villers-le-lac/loisirs-et-activites.jpg',
    link: '/decouvrir-villers-le-lac/loisirs-et-activites',
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
              zIndex: currentIdx === idx ? 2 : 1,
            }}
          >
            <Link className={styles.imageLink} to="#">
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
                <Link to={slide.link} className={styles.readMore}>
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
