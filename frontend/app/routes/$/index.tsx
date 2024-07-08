import { readItems } from '@directus/sdk';
import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json, useLoaderData } from '@remix-run/react';

import { ContentBlock, Headband } from 'app/components';
import type { Page as PageType } from 'app/types';
import directus from 'app/utils/directus';

import styles from './index.module.scss';

const getPage = async (slug: string) => {
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
      throw new Response('Not Found', {
        status: 404,
        statusText: 'Not Found',
      });
    }
    return page[0] as PageType;
  } catch (error) {
    throw new Response('Not Found', {
      status: 404,
      statusText: 'Not Found',
    });
  }
};

type PartialPage = {
  title: string;
  slug: string;
  parent_page?: PartialPage;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const pathname = params['*'] ?? '';
  const slug = pathname.split('/')[0] ?? '';
  const page = await getPage(slug);

  // Check tree structure of website pages
  const breadcrumb = flattenPages(page);
  if (breadcrumb[breadcrumb.length - 1].slug != `/${pathname}`) {
    throw new Response('Not Found', { status: 404, statusText: 'Not Found' });
  }

  return json({ page, breadcrumb });
};

export const meta: MetaFunction<typeof loader> = ({ matches, data }) => {
  const parentMeta = matches
    .flatMap((match) => match.meta ?? [])
    .filter((meta) => !('title' in meta));
  if (!data?.page?.title) {
    return parentMeta;
  }
  return [...parentMeta, { title: data.page?.title }];
};

const Page = () => {
  const { page, breadcrumb } = useLoaderData<typeof loader>();

  return (
    <>
      <Headband
        title={page.title}
        breadcrumb={breadcrumb.map(({ slug, title }) => ({
          link: slug,
          label: title,
        }))}
      />
      <main className={styles.main}>
        <ContentBlock html={page.content} />
      </main>
    </>
  );
};

export default Page;

export { ErrorBoundary } from 'app/components';
