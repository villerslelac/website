'use client'

import { useState } from 'react';
import styles from './page.module.scss'
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

export default function Home() {
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
    <>
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
      <main className={styles.main}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu venenatis diam, in porta tortor. Donec cursus, tortor vel consectetur euismod, dui orci dignissim justo, sit amet fermentum erat magna id neque. In interdum metus tellus, id volutpat ante consectetur ut. Phasellus accumsan ut leo et rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed libero orci, aliquam nec efficitur ac, auctor in ex. Maecenas sodales dictum sapien vel mattis. Nulla vitae auctor urna. Sed dignissim quam augue, quis viverra massa posuere quis. Proin tortor mauris, porttitor quis commodo at, suscipit et libero. Nullam turpis odio, ullamcorper et tempor id, mollis in turpis. Donec facilisis lorem interdum fermentum aliquet.
        </p>
        <p>
          Fusce maximus eu metus quis porta. Nulla facilisi. Ut faucibus interdum nisl et accumsan. Proin rutrum felis neque, in varius ante malesuada auctor. Maecenas id quam urna. Mauris at posuere enim, quis venenatis turpis. Pellentesque justo sapien, finibus sed ullamcorper ac, tincidunt ut lectus. Duis eu felis blandit, blandit ex feugiat, aliquet lacus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas feugiat gravida pellentesque.
        </p>
      </main>
    </>
  )
}
