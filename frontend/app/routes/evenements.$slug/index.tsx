import { readFile, readItems } from '@directus/sdk';
import LocationIcon from '@material-symbols/svg-400/rounded/location_on-fill.svg';
import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json, useLoaderData } from '@remix-run/react';

import { ContentBlock, Headband } from 'app/components';
import { Event as EventType } from 'app/types';
import directus from 'app/utils/directus';
import formatDate from 'app/utils/formatDate';
import { useRootContext } from 'app/utils/useRootContext';

import styles from './index.module.scss';

const getEvent = async (slug: string) => {
  try {
    const event = await directus.request(
      readItems('event', {
        filter: {
          slug: slug,
        },
      }),
    );
    if (event.length != 1) {
      throw new Response('Not Found', { status: 404, statusText: 'Not Found' });
    }
    return event[0];
  } catch (error) {
    throw new Response('Not Found', { status: 404, statusText: 'Not Found' });
  }
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const event = (await getEvent(params.slug ?? '')) as EventType;

  let featuredImage = undefined;
  if (event.featured_image) {
    featuredImage = await directus.request(readFile(event.featured_image));
  }

  return json({ event, featuredImage });
};

export const meta: MetaFunction<typeof loader> = ({ matches, data }) => {
  const parentMeta = matches
    .flatMap((match) => match.meta ?? [])
    .filter((meta) => !('title' in meta));
  if (!data?.event?.title) {
    return parentMeta;
  }
  return [...parentMeta, { title: data.event?.title }];
};

const Event = () => {
  const { directusUrl } = useRootContext();
  const { event, featuredImage } = useLoaderData<typeof loader>();

  return (
    <>
      <Headband
        title={event.title}
        breadcrumb={[
          { link: '/evenements', label: 'Tous les événements' },
          { link: `/evenements/${event.slug}`, label: event.title },
        ]}
      />
      <div className={styles.metadata}>
        <time className={styles.metaTime}>{formatDate(event.date)}</time>
        <span className={styles.metaLocation}>
          <LocationIcon
            width="1.5rem"
            height="1.5rem"
            className={styles.metaLocationIcon}
          />
          {event.location}
        </span>
      </div>
      <main
        className={featuredImage ? styles.mainWithFeaturedImg : styles.main}
      >
        {featuredImage ? (
          <img
            className={styles.featuredImage}
            src={`${directusUrl}/assets/${event.featured_image}`}
            alt={featuredImage.title}
          />
        ) : null}
        <ContentBlock html={event.content} />
      </main>
    </>
  );
};

export default Event;

export { ErrorBoundary } from 'app/components';
