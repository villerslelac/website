'use server';

import { cache } from 'react';

import { readItems } from '@directus/sdk';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import directus from '../lib/directus';
import styles from './page.module.scss';

type Props = {
  params: { slug: string[] };
};

const getPage = cache(async (slug: string) => {
  try {
    const page = await directus.request(
      readItems('page', {
        filter: {
          slug: slug,
        },
        fields: [
          '*,parent_page.title',
          'parent_page.parent_page.title',
          '*,parent_page.slug',
          'parent_page.parent_page.slug',
        ],
      }),
    );
    if (page.length != 1) {
      notFound();
    }
    return page[0];
  } catch (error) {
    notFound();
  }
});

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const page = await getPage(params.slug[params.slug.length - 1]);
  return {
    title: page.title,
  };
};

type PartialPage = {
  title: string;
  slug: string;
  parent_page?: PartialPage;
};

const flattenPages = (obj: any): PartialPage[] => {
  const result: PartialPage[] = [];
  let currentObj = obj;

  while (currentObj) {
    result.unshift({
      title: currentObj.title,
      slug: currentObj.slug,
    });
    currentObj = currentObj.parent_page;
  }

  let currentSlug = '';
  for (let i = 0; i < result.length; i++) {
    currentSlug = `${currentSlug}/${result[i].slug}`;
    result[i].slug = currentSlug;
  }

  return result;
};

const Page = async ({ params }: Props) => {
  const page = await getPage(params.slug[params.slug.length - 1]);
  const breadcrumb = flattenPages(page);

  // Check tree structure of website pages
  const pathname = `/${params.slug.join('/')}`;
  if (breadcrumb[breadcrumb.length - 1].slug != pathname) {
    notFound();
  }

  return (
    <>
      <div className={styles.headband}>
        <ul className={styles.breadcrumb}>
          <li>
            <a href="/">Accueil</a>
          </li>
          {breadcrumb.map(({ slug, title }) => (
            <li key={slug}>
              <a href={slug}>{title}</a>
            </li>
          ))}
        </ul>
        <h1>{page.title}</h1>
      </div>
      <main className={styles.main}>
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </main>
    </>
  );
};

export default Page;
