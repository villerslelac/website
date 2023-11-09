'use client';

import NextIcon from '@material-symbols/svg-400/rounded/trending_flat.svg';
import clsx from 'clsx';
import Link from 'next/link';

import {
  Article,
  Button,
  DiscoverCard,
  Event,
  TourismCard,
} from './components';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main>
      <section className={styles.video}>
        <video autoPlay muted loop>
          <source src="/home.mp4" type="video/mp4" />
          Votre navigateur ne prend pas en charge la balise vidéo.
        </video>
      </section>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Découvrir
            <br />
            <span>Villers-le-Lac</span>
          </h1>
        </div>
      </div>
      <section className={styles.shortcuts}>
        <a href="#" className={styles.shortcut}>
          <span className={clsx(styles.icon, 'material-symbols-rounded')}>
            menu_book
          </span>
          <h3 className={styles.shortcutTitle}>Bulletins municipaux</h3>
        </a>
        <a href="#" className={styles.shortcut}>
          <span className={clsx(styles.icon, 'material-symbols-rounded')}>
            groups
          </span>
          <h3 className={styles.shortcutTitle}>Séances du conseil municipal</h3>
        </a>
        <a href="#" className={styles.shortcut}>
          <span className={clsx(styles.icon, 'material-symbols-rounded')}>
            hub
          </span>
          <h3 className={styles.shortcutTitle}>Associations</h3>
        </a>
        <a href="#" className={styles.shortcut}>
          <span className={clsx(styles.icon, 'material-symbols-rounded')}>
            work
          </span>
          <h3 className={styles.shortcutTitle}>Marchés publics</h3>
        </a>
        <a href="#" className={styles.shortcut}>
          <span className={clsx(styles.icon, 'material-symbols-rounded')}>
            home_work
          </span>
          <h3 className={styles.shortcutTitle}>Urbanisme</h3>
        </a>
      </section>
      <section>
        <div className={styles.contact}>
          <div className={styles.contactIcon}>
            <NextIcon />
          </div>
          <a href="#" className={styles.contactLink}>
            <span>Une question ?</span>
            <br />
            Contacter la mairie
          </a>
        </div>
      </section>
      <section className={styles.section}>
        <h2 className={styles.subtitle}>Actualités</h2>
        <div className={styles.articles}>
          <Article size="lg" className={styles.inTheNews} />
          <Article />
          <Article />
          <Article />
        </div>
        <div className={styles.articlesBtnContainer}>
          <Button as={Link} href="#">
            Toute l&apos;actualité
          </Button>
        </div>
      </section>
      <section className={styles.section}>
        <h2 className={styles.subtitle}>Agenda</h2>
        <div className={styles.events}>
          <Event
            title="Titre de l'évènement"
            size="lg"
            className={styles.nextEvent}
          />
          <div className={styles.nextEvents}>
            <Event title="Titre court" />
            <Event title="Titre de l'évènement très long" />
            <Event title="Titre de l'évènement long" />
            <Event title="Titre de l'évènement" />
          </div>
        </div>
        <div className={styles.eventsBtnContainer}>
          <Button as={Link} href="#">
            Tous les évènements
          </Button>
        </div>
      </section>
      <section className={styles.tourismContainer}>
        <TourismCard />
      </section>
      <section className={styles.discoverContainer}>
        <h2 className={styles.discoverTitle}>
          Découvrir
          <br />
          <span>Villers-le-Lac</span>
        </h2>
        <DiscoverCard />
        <div className={styles.discoverBtnContainer}>
          <Button as={Link} href="#">
            Découvrir Villers-le-Lac
          </Button>
        </div>
      </section>
    </main>
  );
}
