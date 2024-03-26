'use server';

import React, { cache } from 'react';

import { readItems } from '@directus/sdk';
import ArrowIcon from '@material-symbols/svg-400/rounded/arrow_forward.svg';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Headband } from '../../components';
import { ReportFolders } from '../../types/report';
import directus from '../../utils/directus';
import styles from './page.module.scss';

const getReportFolders = cache(async () => {
  try {
    const folders = await directus.request(readItems('report_folder'));
    return folders;
  } catch (error) {
    notFound();
  }
});

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'Séances du conseil municipal',
  };
};

const Folders = async () => {
  const folders = (await getReportFolders()) as ReportFolders;

  return (
    <>
      <Headband
        title="Séances du conseil municipal"
        breadcrumb={[
          { link: '/votre-mairie', label: 'Votre mairie' },
          {
            link: '/votre-mairie/seances-du-conseil-municipal',
            label: 'Séances du conseil municipal',
          },
        ]}
      />
      <main className={styles.main}>
        <ul className={styles.links}>
          {folders.map((folder) => (
            <li className={styles.link} key={folder.id}>
              <a
                href={`/votre-mairie/seances-du-conseil-municipal/${folder.slug}`}
              >
                <span>{folder.name}</span>
                <span className={styles.arrowIcon}>
                  <ArrowIcon width="2rem" height="2rem" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Folders;
