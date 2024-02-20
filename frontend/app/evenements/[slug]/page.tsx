'use server';

import { cache } from 'react';

import { readFile, readItems } from '@directus/sdk';
import LocationIcon from '@material-symbols/svg-400/rounded/location_on-fill.svg';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ContentBlock, Headband } from '../../components';
import { Event as IEvent } from '../../types';
import directus from '../../utils/directus';
import formatDate from '../../utils/formatDate';
import styles from './page.module.scss';

type Props = {
  params: { slug: string };
};

const getEvent = cache(async (slug: string) => {
  try {
    const event = await directus.request(
      readItems('event', {
        filter: {
          slug: slug,
        },
      }),
    );
    if (event.length != 1) {
      notFound();
    }
    return event[0];
  } catch (error) {
    notFound();
  }
});

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const event = await getEvent(params.slug);
  return {
    title: event.title,
  };
};

const Event = async ({ params }: Props) => {
  const event = (await getEvent(params.slug)) as IEvent;

  let featuredImage = undefined;
  if (event.featured_image) {
    featuredImage = await directus.request(readFile(event.featured_image));
  }

  return (
    <>
      <Headband
        title={event.title}
        breadcrumb={[
          { link: '/evenements', label: 'Tous les événements' },
          { link: `/evenements/${params.slug}`, label: event.title },
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
            src={`${process.env.DIRECTUS_URL}/assets/${event.featured_image}`}
            alt={featuredImage.title}
          />
        ) : null}
        <ContentBlock html={event.content} />
      </main>
    </>
  );
};

export default Event;
