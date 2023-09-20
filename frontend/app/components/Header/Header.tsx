'use client'

import { useState } from 'react';
import styles from './Header.module.scss'
import clsx from 'clsx';

const items = [
  'Votre Mairie',
  'Vos démarches',
  'Vivre à Villers',
  'Découvrir Villers-le-Lac'
];

const subItems = [
  'Équipe municipale',
  'Employés municipaux',
  'Organigramme des services',
  'Services',
  'Séances du Conseil municipal',
  'Bulletins municipaux',
  'Marchés publics',
  'Offres d\'emploi'
];

export const Header: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [currentPos, setCurrentPos] = useState(0);
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    if (!open) {
      console.log(window.scrollY);
      setCurrentPos(window.scrollY);
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
      setActiveItem(null);
    }
    setOpen(!open)
  }

  const toggleItem = (idx: number) => {
    if (activeItem != idx) {
      setActiveItem(idx);
    } else {
      setActiveItem(null);
    }
  }

  return (
    <header style={{ '--scroll-top': `-${currentPos}px` }}>
      <nav className={clsx(open && styles.open, styles.navbar)}>
        <div className={styles.menu}>
          <a href="/" className={styles.logo}></a>
          <button
            className={styles.btn}
            onClick={toggleMenu}
          >
            <span className={styles.btnBurger} />
          </button>
        </div>
        <ul className={styles.items}>
          {items.map((item, idx) => {
            if (idx == 0) {
              return (
                <li key={idx} className={clsx(idx == activeItem && styles.open, styles.expandableItem)}>
                  <a href="javascript:void(0)" onClick={(e) => { e.stopPropagation(); toggleItem(idx) }}>{item}</a>
                  <div className={styles.submenu}>
                    <div className={styles.submenuContent}>
                      <span className={styles.submenuTitle}>{item}</span>
                      <a href="#" className={styles.submenuSeeMore}>Voir toute la rubrique</a>
                      <ul>
                        {subItems.map((item, idx) => (
                          <li key={idx}>
                            <a href="#">{item}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            }
            return (
              <li key={idx}>
                <a href="#">{item}</a>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className={styles.headband}>
        <ul className={styles.breadcrumb}>
          <li><a href="#">Home</a></li>
          <li><a href="#">Page</a></li>
          <li>Page courante</li>
        </ul>
        <h1>Mon titre</h1>
      </div>
    </header>
  );
};
