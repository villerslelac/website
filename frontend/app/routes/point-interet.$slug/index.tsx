import { readItems } from '@directus/sdk';
import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json, useLoaderData } from '@remix-run/react';

import { ContentBlock, Headband } from 'app/components';
import { POI } from 'app/types';
import directus from 'app/utils/directus';

import styles from './index.module.scss';

const getPoi = async (slug: string) => {
  try {
    const poi = await directus.request(
      readItems('poi', {
        filter: {
          slug: slug,
        },
      }),
    );
    if (poi.length != 1) {
      throw new Response('Not Found', { status: 404, statusText: 'Not Found' });
    }
    return poi[0];
  } catch (error) {
    throw new Response('Not Found', { status: 404, statusText: 'Not Found' });
  }
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const poi = (await getPoi(params.slug ?? '')) as POI;

  return json({ poi });
};

export const meta: MetaFunction<typeof loader> = ({ matches, data }) => {
  const parentMeta = matches
    .flatMap((match) => match.meta ?? [])
    .filter((meta) => !('title' in meta));
  if (!data?.poi?.name) {
    return parentMeta;
  }
  return [...parentMeta, { title: data.poi?.name }];
};

const Post = () => {
  const { poi } = useLoaderData<typeof loader>();

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'restaurant':
        return 'Restaurant';
      case 'shop':
        return 'Commerce';
      case 'tourism':
        return 'Tourisme';
      default:
        return 'Association';
    }
  };

  return (
    <>
      <Headband
        title={poi.name}
        breadcrumb={[
          { link: '/carte-interactive', label: 'Carte interactive' },
          { link: `/point-interet/${poi.slug}`, label: poi.name },
        ]}
      />
      <div className={styles.metadata}>
        <span className={styles.category}>
          <span className={styles[poi.category]} />
          {getCategoryName(poi.category)}
        </span>
        <p>{poi.description}</p>
      </div>
      <main className={styles.main}>
        <h3 className={styles.title}>Adresse</h3>
        <ContentBlock html={poi.address} />
        {poi.contact ? (
          <>
            <h3 className={styles.title}>Contact</h3>
            <ContentBlock html={poi.contact} />
          </>
        ) : null}
        {poi.external_links ? (
          <>
            <h3 className={styles.title}>Liens externes</h3>
            <ul className={styles.externalLinks}>
              {poi.external_links.map((link, idx) => (
                <li key={idx}>
                  <a href={link.link}>{link.name}</a>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </main>
    </>
  );
};

export default Post;
