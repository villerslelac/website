import { readFile } from '@directus/sdk';
import EventIcon from '@material-symbols/svg-400/rounded/location_on-fill.svg';
import clsx from 'clsx';
import Link from 'next/link';

import { Event as IEvent } from '../../types';
import directus from '../../utils/directus';
import { ContentBlock } from '../ContentBlock/ContentBlock';
import styles from './Event.module.scss';

interface EventProps {
  event: IEvent;
  size?: 'lg';
  className?: string;
}

const frenchMonths = [
  'Jan.',
  'Fév.',
  'Mars',
  'Avr.',
  'Mai',
  'Juin',
  'Jui.',
  'Août',
  'Sep.',
  'Oct.',
  'Nov.',
  'Déc.',
];

export const Event: React.FC<EventProps> = async ({
  event,
  size,
  className,
}) => {
  let featuredImage = undefined;
  if (size == 'lg' && event.featured_image) {
    featuredImage = await directus.request(readFile(event.featured_image));
  }

  const date = new Date(event.date);
  const day = date.getDate();
  const month = frenchMonths[date.getMonth()];

  return (
    <div
      className={clsx(
        size == 'lg' ? styles.largeEvent : styles.event,
        className,
      )}
    >
      <Link className={styles.imageLink} href={`/evenements/${event.slug}`}>
        <div className={styles.date}>
          <span className={styles.dateDay}>{day}</span>
          <span className={styles.dateMonth}>{month}</span>
        </div>
        {size == 'lg' ? (
          featuredImage ? (
            <img
              className={styles.image}
              src={`${process.env.DIRECTUS_URL}/assets/${event.featured_image}?key=event`}
              alt={featuredImage.title}
            />
          ) : (
            <img
              className={styles.image}
              src="/default-event-background.png"
              alt={event.title}
            />
          )
        ) : null}
      </Link>
      <Link className={styles.content} href={`/evenements/${event.slug}`}>
        <h3 className={styles.title}>{event.title}</h3>
        {size == 'lg' ? (
          <ContentBlock className={styles.excerpt} html={event.excerpt} />
        ) : null}
        <footer className={styles.meta}>
          <EventIcon className={styles.icon} />
          {event.location}
        </footer>
      </Link>
    </div>
  );
};
