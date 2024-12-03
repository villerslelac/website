import { readItems } from '@directus/sdk';
import ArrowIcon from '@material-symbols/svg-400/rounded/arrow_forward.svg';
import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Link, json, useLoaderData, useMatches } from '@remix-run/react';

import { ContentBlock, Headband } from 'app/components';
import type { Menu, Page as PageType } from 'app/types';
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
  let pathname = params['*'] ?? '';
  if (pathname.endsWith('/')) {
    pathname = pathname.slice(0, pathname.length - 1);
  }
  const splitedPathname = pathname.split('/') ?? [];
  const slug = splitedPathname[splitedPathname.length - 1];
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
  const matches = useMatches();

  const parentData = matches.find((match) => match.id === 'root')?.data as {
    menu?: Menu;
  };
  const menu = parentData?.menu;
  const subPages =
    menu?.items?.find((item) => item.link.slice(1) == page.slug)?.items ?? [];

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
        {subPages.length > 0 ? (
          <ul className={styles.links}>
            {subPages.map((subPage, idx) => (
              <li className={styles.link} key={idx}>
                <Link to={subPage.link}>
                  <span>{subPage.label}</span>
                  <span className={styles.arrowIcon}>
                    <ArrowIcon width="2rem" height="2rem" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
        {page.content ? <ContentBlock html={page.content} /> : null}{' '}
      </main>
    </>
  );
};

export default Page;

export { ErrorBoundary } from 'app/components';
