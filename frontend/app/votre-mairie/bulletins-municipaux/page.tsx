'use server';

import React, { cache } from 'react';

import { readItems } from '@directus/sdk';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Headband } from '../../components';
import { Bulletins as TBulletins } from '../../types/bulletin';
import directus from '../../utils/directus';
import styles from './page.module.scss';

const getBulletins = cache(async () => {
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
    notFound();
  }
});

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'Bulletins municipaux',
  };
};

const Bulletins = async () => {
  const bulletins = (await getBulletins()) as TBulletins;

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
                src={`${process.env.DIRECTUS_URL}/assets/${bulletin.cover.id}/${bulletin.cover.filename_download}`}
              />
              <div className={styles.bulletinContent}>
                <p className={styles.bulletinName}>{bulletin.name}</p>
                <a
                  className={styles.bulletinLink}
                  href={`${process.env.DIRECTUS_URL}/assets/${bulletin.file.id}/${bulletin.file.filename_download}`}
                  target="_blank"
                  download={bulletin.file.filename_download}
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
