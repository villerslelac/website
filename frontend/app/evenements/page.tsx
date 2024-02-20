'use server';

import { readItems } from '@directus/sdk';
import clsx from 'clsx';
import { Metadata } from 'next';
import Link from 'next/link';

import { Button, Event, Headband } from '../components';
import { Events } from '../types';
import directus from '../utils/directus';
import styles from './page.module.scss';

const EVENTS_LIMIT = 8;

const getEvents = async (page: number, viewUpcoming: boolean) => {
  try {
    const events = await directus.request(
      readItems('event', {
        filter: {
          date: viewUpcoming ? { _gte: '$NOW' } : { _lt: '$NOW' },
        },
        sort: [viewUpcoming ? 'date' : '-date'],
        limit: EVENTS_LIMIT,
        page: page,
      }),
    );
    return events as Events;
  } catch (error) {
    return [];
  }
};

const getNbrOfEvents = async (viewUpcoming: boolean) => {
  try {
    const result = await directus.request(
      readItems('event', {
        filter: {
          date: viewUpcoming ? { _gte: '$NOW' } : { _lt: '$NOW' },
        },
        aggregate: { count: '*' },
      }),
    );
    return result[0].count;
  } catch (error) {
    return 0;
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Tous les événements',
  };
}

const News = async ({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    tab?: string;
  };
}) => {
  const page = searchParams?.page ? parseInt(searchParams.page) || 1 : 1;
  const viewUpcoming = searchParams?.tab != 'passes';
  const events = (await getEvents(page, viewUpcoming)) as Events;
  const nbrOfEvents = (await getNbrOfEvents(viewUpcoming)) as number;
  const isLastPage = page * EVENTS_LIMIT >= nbrOfEvents;

  return (
    <>
      <Headband
        title="Tous les événements"
        breadcrumb={[{ link: '/evenements', label: 'Tous les événements' }]}
      />
      <main className={styles.main}>
        <div className={styles.orderContainer}>
          <Link
            href="/evenements"
            className={clsx(viewUpcoming && styles.active, styles.nextBtn)}
          >
            À venir
          </Link>
          <Link
            href="/evenements?tab=passes"
            className={clsx(!viewUpcoming && styles.active, styles.pastBtn)}
          >
            Passés
          </Link>
        </div>
        <div className={styles.events}>
          {events.map((event) => (
            <Event size="lg" key={event.id} event={event} />
          ))}
        </div>
        <div className={styles.eventsBtnContainer}>
          {!isLastPage ? (
            viewUpcoming ? (
              <Button as={Link} href={`/evenements?page=${page + 1}`}>
                Événements suivants
              </Button>
            ) : (
              <Button
                as={Link}
                href={`/evenements?tab=passes&page=${page + 1}`}
              >
                Événements précédents
              </Button>
            )
          ) : null}
        </div>
      </main>
    </>
  );
};

export default News;
