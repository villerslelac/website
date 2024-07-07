import { readItems } from '@directus/sdk';
import ArrowIcon from '@material-symbols/svg-400/rounded/arrow_forward.svg';
import { MetaFunction } from '@remix-run/node';
import { json, useLoaderData } from '@remix-run/react';

import { Headband } from 'app/components';
import { ReportFolders } from 'app/types/report';
import directus from 'app/utils/directus';

import styles from './index.module.scss';

const getReportFolders = async () => {
  try {
    const folders = await directus.request(readItems('report_folder'));
    return folders;
  } catch (error) {
    return [];
  }
};

export const loader = async () => {
  const folders = (await getReportFolders()) as ReportFolders;

  return json({ folders });
};

export const meta: MetaFunction<typeof loader> = ({ matches }) => {
  const parentMeta = matches
    .flatMap((match) => match.meta ?? [])
    .filter((meta) => !('title' in meta));
  return [...parentMeta, { title: 'Séances du conseil municipal' }];
};

const Folders = () => {
  const { folders } = useLoaderData<typeof loader>();

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
