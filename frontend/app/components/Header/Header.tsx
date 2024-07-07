import { useState } from 'react';

import { Link, useLocation } from '@remix-run/react';
import clsx from 'clsx';

import { Menu } from 'app/types';

import styles from './Header.module.scss';

interface HeaderProps {
  menu: Menu;
}

export const Header: React.FC<HeaderProps> = ({ menu }) => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [currentPos, setCurrentPos] = useState(0);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    if (!open) {
      setCurrentPos(window.scrollY);
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
      setActiveItem(null);
    }
    setOpen(!open);
  };

  const handleClose = () => {
    document.body.classList.remove('no-scroll');
    setActiveItem(null);
    setOpen(false);
  };

  const toggleItem = (idx: number) => {
    if (activeItem != idx) {
      setActiveItem(idx);
    } else {
      setActiveItem(null);
    }
  };

  return (
    <header
      className={clsx(
        activeItem != null && styles.submenuOpen,
        location.pathname === '/' ? styles.homeHeader : styles.header,
      )}
      style={{ '--scroll-top': `-${currentPos}px` } as React.CSSProperties}
    >
      <nav className={clsx(open && styles.open, styles.navbar)}>
        <div className={styles.menu}>
          <Link to="/" onClick={handleClose} className={styles.logo} />
          <button className={styles.btn} onClick={toggleMenu}>
            <span className={styles.btnBurger} />
          </button>
        </div>
        <ul className={styles.items}>
          {menu.items?.map(({ label, link, items: subItems }, idx) => {
            if (subItems) {
              return (
                <li
                  key={idx}
                  className={clsx(
                    idx == activeItem && styles.open,
                    styles.expandableItem,
                  )}
                >
                  <button
                    onClick={() => {
                      toggleItem(idx);
                    }}
                  >
                    {label}
                  </button>
                  <div className={styles.submenu}>
                    <div className={styles.submenuContent}>
                      <span className={styles.submenuTitle}>{label}</span>
                      <Link
                        to={link}
                        onClick={handleClose}
                        className={styles.submenuSeeMore}
                      >
                        Voir toute la rubrique
                      </Link>
                      <ul>
                        {subItems.map(({ label, link }, idx) => (
                          <li key={idx}>
                            <Link to={link} onClick={handleClose}>
                              {label}
                            </Link>
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
                <Link to={link} onClick={handleClose}>
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {activeItem != null ? (
        <div
          className={styles.backdrop}
          onClick={handleClose}
          onKeyDown={handleClose}
          role="button"
          tabIndex={0}
        />
      ) : null}
    </header>
  );
};
