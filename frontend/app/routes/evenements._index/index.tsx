import { readItems } from '@directus/sdk';
import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Link, json, useLoaderData } from '@remix-run/react';
import clsx from 'clsx';

import { Button, Event, Headband } from 'app/components';
import { Events as EventsType } from 'app/types';
import directus from 'app/utils/directus';

import styles from './index.module.scss';

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
    return events as EventsType;
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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pageParam = url.searchParams.get('page');
  const page = pageParam ? parseInt(pageParam) || 1 : 1;
  const viewUpcoming = url.searchParams.get('tab') != 'passes';

  const events = (await getEvents(page, viewUpcoming)) as EventsType;
  const nbrOfEvents = (await getNbrOfEvents(viewUpcoming)) as number;
  const isLastPage = page * EVENTS_LIMIT >= nbrOfEvents;

  return json({ events, page, viewUpcoming, isLastPage });
};

export const meta: MetaFunction = ({ matches }) => {
  const parentMeta = matches
    .flatMap((match) => match.meta ?? [])
    .filter((meta) => !('title' in meta));
  return [...parentMeta, { title: 'Tous les évènements' }];
};

const Events = () => {
  const { events, page, viewUpcoming, isLastPage } =
    useLoaderData<typeof loader>();

  return (
    <>
      <Headband
        title="Tous les événements"
        breadcrumb={[{ link: '/evenements', label: 'Tous les événements' }]}
      />
      <main className={styles.main}>
        <div className={styles.orderContainer}>
          <Link
            to="/evenements"
            className={clsx(viewUpcoming && styles.active, styles.nextBtn)}
          >
            À venir
          </Link>
          <Link
            to="/evenements?tab=passes"
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
              <Button as={Link} to={`/evenements?page=${page + 1}`}>
                Événements suivants
              </Button>
            ) : (
              <Button as={Link} to={`/evenements?tab=passes&page=${page + 1}`}>
                Événements précédents
              </Button>
            )
          ) : null}
        </div>
      </main>
    </>
  );
};

export default Events;
