import { readItems } from '@directus/sdk';
import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json, useLoaderData } from '@remix-run/react';

import { Headband } from 'app/components';
import { ReportFolder, Reports } from 'app/types/report';
import directus from 'app/utils/directus';
import { useRootContext } from 'app/utils/useRootContext';

import styles from './index.module.scss';

const getReportFolder = async (slug: string) => {
  try {
    const folder = await directus.request(
      readItems('report_folder', {
        filter: {
          slug: slug,
        },
      }),
    );
    if (folder.length != 1) {
      throw new Response('Not Found', { status: 404, statusText: 'Not Found' });
    }
    return folder[0];
  } catch (error) {
    throw new Response('Not Found', { status: 404, statusText: 'Not Found' });
  }
};

const getReports = async (id: number) => {
  try {
    const reports = await directus.request(
      readItems('report', {
        fields: [
          '*,folder.name',
          'files.directus_files_id.filename_download',
          'files.directus_files_id.title',
          'files.directus_files_id.id',
        ],
        filter: {
          folder: id,
        },
        sort: ['-date'],
      }),
    );
    return reports;
  } catch (error) {
    throw new Response('Not Found', { status: 404, statusText: 'Not Found' });
  }
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const folder = (await getReportFolder(params.slug ?? '')) as ReportFolder;
  const reports = (await getReports(folder.id)) as Reports;
  return json({ folder, reports });
};

export const meta: MetaFunction<typeof loader> = ({ matches, data }) => {
  const parentMeta = matches
    .flatMap((match) => match.meta ?? [])
    .filter((meta) => !('title' in meta));
  if (!data?.folder.name) {
    return parentMeta;
  }
  return [...parentMeta, { title: data.folder.name }];
};

const AllReports = () => {
  const { directusUrl } = useRootContext();
  const { folder, reports } = useLoaderData<typeof loader>();

  return (
    <>
      <Headband
        title={folder.name}
        breadcrumb={[
          { link: '/votre-mairie', label: 'Votre mairie' },
          {
            link: '/votre-mairie/seances-du-conseil-municipal',
            label: 'Séances du conseil municipal',
          },
          {
            link: `/votre-mairie/seances-du-conseil-municipal/${folder.slug}`,
            label: folder.name,
          },
        ]}
      />
      <main className={styles.main}>
        {reports.map((report) => (
          <div className={styles.report} key={report.id}>
            <h3 className={styles.reportTitle}>{report.name}</h3>
            <ul className={styles.links}>
              {report.files.map((file) => (
                <li className={styles.link} key={file.directus_files_id.id}>
                  <a
                    href={`${directusUrl}/assets/${file.directus_files_id.id}/${file.directus_files_id.filename_download}`}
                    target="_blank"
                    download={file.directus_files_id.filename_download}
                    rel="noreferrer"
                  >
                    {file.directus_files_id.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </main>
    </>
  );
};

export default AllReports;

export { ErrorBoundary } from 'app/components';
