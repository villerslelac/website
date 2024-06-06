'use server';

import { readItems } from '@directus/sdk';
import NextIcon from '@material-symbols/svg-400/rounded/trending_flat.svg';
import clsx from 'clsx';
import Link from 'next/link';

import {
  Button,
  DiscoverCard,
  Event,
  InteractiveMapCard,
  Post,
  TourismCard,
} from './components';
import styles from './page.module.scss';
import { Events, Posts } from './types';
import directus from './utils/directus';

const getPosts = async () => {
  try {
    const posts = await directus.request(
      readItems('post', {
        fields: ['*', 'tag.*'],
        sort: ['-featured', '-date_published'],
        limit: 4,
      }),
    );
    return posts as Posts;
  } catch (error) {
    return [];
  }
};

const getEvents = async () => {
  try {
    const events = await directus.request(
      readItems('event', {
        filter: {
          date: {
            _gte: '$NOW',
          },
        },
        sort: ['date'],
        limit: 5,
      }),
    );
    return events as Events;
  } catch (error) {
    return [];
  }
};

const Home = async () => {
  const posts = await getPosts();
  const events = await getEvents();

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
        <a
          href="/votre-mairie/bulletins-municipaux"
          className={styles.shortcut}
        >
          <span className={clsx(styles.icon, 'material-symbols-rounded')}>
            menu_book
          </span>
          <h3 className={styles.shortcutTitle}>Bulletins municipaux</h3>
        </a>
        <a
          href="/votre-mairie/seances-du-conseil-municipal"
          className={styles.shortcut}
        >
          <span className={clsx(styles.icon, 'material-symbols-rounded')}>
            groups
          </span>
          <h3 className={styles.shortcutTitle}>Séances du conseil municipal</h3>
        </a>
        <a href="/carte-interactive" className={styles.shortcut}>
          <span className={clsx(styles.icon, 'material-symbols-rounded')}>
            hub
          </span>
          <h3 className={styles.shortcutTitle}>Associations</h3>
        </a>
        <a href="/votre-mairie/marches-publics" className={styles.shortcut}>
          <span className={clsx(styles.icon, 'material-symbols-rounded')}>
            work
          </span>
          <h3 className={styles.shortcutTitle}>Marchés publics</h3>
        </a>
        <a href="/vivre-a-villers/urbanisme" className={styles.shortcut}>
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
          <a href="/contact" className={styles.contactLink}>
            <span>Une question ?</span>
            <br />
            Contacter la mairie
          </a>
        </div>
      </section>
      <section className={styles.section}>
        <h2 className={styles.subtitle}>Actualités</h2>
        <div className={styles.posts}>
          {posts.map((post, idx) => (
            <Post
              key={post.id}
              size={idx == 0 ? 'lg' : undefined}
              className={clsx(idx == 0 && styles.inTheNews)}
              post={post}
            />
          ))}
        </div>
        <div className={styles.postsBtnContainer}>
          <Button as={Link} href="/actualite">
            Toute l&apos;actualité
          </Button>
        </div>
      </section>
      <section className={styles.section}>
        <h2 className={styles.subtitle}>Agenda</h2>
        <div className={styles.events}>
          {events.length > 0 ? (
            <Event size="lg" className={styles.nextEvent} event={events[0]} />
          ) : null}
          {events.length > 1 ? (
            <div className={styles.nextEvents}>
              {events.slice(1).map((event) => (
                <Event key={event.id} event={event} />
              ))}
            </div>
          ) : null}
        </div>
        <div className={styles.eventsBtnContainer}>
          <Button as={Link} href="/evenements">
            Tous les évènements
          </Button>
        </div>
      </section>
      <section className={styles.interactiveMapContainer}>
        <InteractiveMapCard />
      </section>
      <section className={styles.discoverContainer}>
        <h2 className={styles.discoverTitle}>
          Découvrir
          <br />
          <span>Villers-le-Lac</span>
        </h2>
        <DiscoverCard />
        <div className={styles.discoverBtnContainer}>
          <Button as={Link} href="/decouvrir-villers-le-lac">
            Découvrir Villers-le-Lac
          </Button>
        </div>
      </section>
      <section className={styles.tourismContainer}>
        <TourismCard />
      </section>
      <section className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerBackground} />
          <div className={styles.footerContent}>
            <h3 className={styles.subtitle}>Bon à savoir</h3>
            <p>
              En hiver, de nombreuses activités sportives nordiques sont
              possibles : ski alpin, ski nordique, raquettes, … La commune est
              dotée de pistes de ski alpin au lieu-dit « le Chauffaud » proche
              du Meix Musy (1 287 m), mais également de ski de fond.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
