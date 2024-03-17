'use server';

import { useMemo } from 'react';

import { readItems } from '@directus/sdk';
import dynamic from 'next/dynamic';

import { Headband, Spinner } from '../components';
import { POIs } from '../types';
import directus from '../utils/directus';
import styles from './page.module.scss';

const getPOIs = async () => {
  try {
    const posts = await directus.request(
      readItems('poi', {
        sort: ['name'],
        limit: -1,
      }),
    );
    return posts;
  } catch (error) {
    return [];
  }
};

const InteractiveMap = async () => {
  const Map = useMemo(
    () =>
      dynamic(() => import('../components/InteractiveMap'), {
        loading: () => (
          <main className={styles.main}>
            <Spinner />
          </main>
        ),
        ssr: false,
      }),
    [],
  );
  const pois = (await getPOIs()) as POIs;

  return (
    <>
      <Headband
        title="Carte interactive"
        breadcrumb={[
          { link: '/carte-interactive', label: 'Carte interactive' },
        ]}
      />
      <main>
        <Map position={[47.061, 6.6751]} zoom={14} pois={pois} />
      </main>
    </>
  );
};

export default InteractiveMap;
