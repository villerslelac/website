'use server';

import { cache } from 'react';

import { readItems } from '@directus/sdk';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ContentBlock, Headband } from '../../components';
import { POI } from '../../types';
import directus from '../../utils/directus';
import styles from './page.module.scss';

type Props = {
  params: { slug: string };
};

const getPoi = cache(async (slug: string) => {
  try {
    const poi = await directus.request(
      readItems('poi', {
        filter: {
          slug: slug,
        },
      }),
    );
    if (poi.length != 1) {
      notFound();
    }
    return poi[0];
  } catch (error) {
    notFound();
  }
});

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const post = await getPoi(params.slug);
  return {
    title: post.name,
  };
};

const Post = async ({ params }: Props) => {
  const poi = (await getPoi(params.slug)) as POI;

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
          { link: `/point-interet/${params.slug}`, label: poi.name },
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
