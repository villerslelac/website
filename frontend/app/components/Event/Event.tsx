import EventIcon from '@material-symbols/svg-400/rounded/location_on-fill.svg';
import { Link } from '@remix-run/react';
import clsx from 'clsx';

import { Event as IEvent } from 'app/types';
import { useRootContext } from 'app/utils/useRootContext';

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

export const Event: React.FC<EventProps> = ({ event, size, className }) => {
  const { directusUrl } = useRootContext();
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
      <Link className={styles.imageLink} to={`/evenements/${event.slug}`}>
        <div className={styles.date}>
          <span className={styles.dateDay}>{day}</span>
          <span className={styles.dateMonth}>{month}</span>
        </div>
        {size == 'lg' ? (
          event.featured_image ? (
            <img
              className={styles.image}
              src={`${directusUrl}/assets/${event.featured_image}?key=event`}
              alt={event.title}
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
      <Link className={styles.content} to={`/evenements/${event.slug}`}>
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
