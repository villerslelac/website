import { useEffect, useState } from 'react';

import { readItems } from '@directus/sdk';
import { json, useLoaderData } from '@remix-run/react';

import { Headband, InteractiveMap as Map, Spinner } from 'app/components';
import { POIs } from 'app/types';
import directus from 'app/utils/directus';

import styles from './index.module.scss';

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

export const loader = async () => {
  const pois = (await getPOIs()) as POIs;

  return json({ pois });
};

let isHydrating = true;

const InteractiveMap = () => {
  const { pois } = useLoaderData<typeof loader>();
  const [isHydrated, setIsHydrated] = useState(() => !isHydrating);

  useEffect(() => {
    isHydrating = false;
    setIsHydrated(true);
  }, []);

  return (
    <>
      <Headband
        title="Carte interactive"
        breadcrumb={[
          { link: '/carte-interactive', label: 'Carte interactive' },
        ]}
      />
      {!isHydrated ? (
        <main className={styles.main}>
          <Spinner />
        </main>
      ) : (
        <main>
          <Map position={[47.061, 6.6751]} zoom={14} pois={pois} />
        </main>
      )}
    </>
  );
};

export default InteractiveMap;
