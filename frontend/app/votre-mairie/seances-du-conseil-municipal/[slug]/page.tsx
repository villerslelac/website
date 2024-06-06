'use server';

import { readItems } from '@directus/sdk';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Headband } from '../../../components';
import { ReportFolder, Reports } from '../../../types/report';
import directus from '../../../utils/directus';
import styles from './page.module.scss';

type Props = {
  params: { slug: string };
};

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
      notFound();
    }
    return folder[0];
  } catch (error) {
    notFound();
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
      }),
    );
    return reports;
  } catch (error) {
    notFound();
  }
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const folder = await getReportFolder(params.slug);
  return {
    title: folder.name,
  };
};

const AllReports = async ({ params }: Props) => {
  const folder = (await getReportFolder(params.slug)) as ReportFolder;
  const reports = (await getReports(folder.id)) as Reports;

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
            link: `/votre-mairie/seances-du-conseil-municipal/${params.slug}`,
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
                    href={`${process.env.DIRECTUS_URL}/assets/${file.directus_files_id.id}/${file.directus_files_id.filename_download}`}
                    target="_blank"
                    download={file.directus_files_id.filename_download}
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
