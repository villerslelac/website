import { readItems } from '@directus/sdk';
import { MetaFunction } from '@remix-run/node';
import { json, useLoaderData } from '@remix-run/react';

import { Headband } from 'app/components';
import { Bulletins as TBulletins } from 'app/types/bulletin';
import directus from 'app/utils/directus';
import { useRootContext } from 'app/utils/useRootContext';

import styles from './index.module.scss';

const getBulletins = async () => {
  try {
    const bulletins = await directus.request(
      readItems('bulletin', {
        fields: [
          '*',
          'cover.filename_download',
          'cover.title',
          'cover.id',
          'file.filename_download',
          'file.title',
          'file.id',
        ],
        sort: ['-year'],
      }),
    );
    return bulletins;
  } catch (error) {
    return [];
  }
};

export const loader = async () => {
  const bulletins = (await getBulletins()) as TBulletins;

  return json({ bulletins });
};

export const meta: MetaFunction<typeof loader> = ({ matches }) => {
  const parentMeta = matches
    .flatMap((match) => match.meta ?? [])
    .filter((meta) => !('title' in meta));
  return [...parentMeta, { title: 'Bulletins municipaux' }];
};

const Bulletins = () => {
  const { directusUrl } = useRootContext();
  const { bulletins } = useLoaderData<typeof loader>();

  return (
    <>
      <Headband
        title="Bulletins municipaux"
        breadcrumb={[
          { link: '/votre-mairie', label: 'Votre mairie' },
          {
            link: '/votre-mairie/bulletins-municipaux',
            label: 'Bulletins municipaux',
          },
        ]}
      />
      <main className={styles.main}>
        <div className={styles.bulletins}>
          {bulletins.map((bulletin) => (
            <div className={styles.bulletin} key={bulletin.file.id}>
              <img
                className={styles.bulletinCover}
                alt={bulletin.cover.title}
                src={`${directusUrl}/assets/${bulletin.cover.id}/${bulletin.cover.filename_download}`}
              />
              <div className={styles.bulletinContent}>
                <p className={styles.bulletinName}>{bulletin.name}</p>
                <a
                  className={styles.bulletinLink}
                  href={`${directusUrl}/assets/${bulletin.file.id}/${bulletin.file.filename_download}`}
                  target="_blank"
                  download={bulletin.file.filename_download}
                  rel="noreferrer"
                >
                  Télécharger le bulletin
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Bulletins;
