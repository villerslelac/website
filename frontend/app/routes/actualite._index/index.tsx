import { aggregate, readItems } from '@directus/sdk';
import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Link, json, useLoaderData } from '@remix-run/react';
import clsx from 'clsx';

import { Button, Headband, Post } from 'app/components';
import { Posts } from 'app/types';
import directus from 'app/utils/directus';

import styles from './index.module.scss';

const POSTS_LIMIT = 8;

const getPosts = async (page: number) => {
  try {
    const posts = await directus.request(
      readItems('post', {
        fields: ['*', 'tag.*'],
        sort: ['-featured', '-date_published'],
        limit: POSTS_LIMIT,
        page: page,
      }),
    );
    return posts;
  } catch (error) {
    return [];
  }
};

const getNbrOfPosts = async () => {
  try {
    const result = await directus.request(
      aggregate('post', {
        aggregate: { count: '*' },
      }),
    );
    return result[0].count;
  } catch (error) {
    return 0;
  }
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const pageParam = url.searchParams.get('page');
  const page = pageParam ? parseInt(pageParam) || 1 : 1;

  const posts = (await getPosts(page)) as Posts;
  const nbrOfPosts = (await getNbrOfPosts()) as number;
  const isLastPage = page * POSTS_LIMIT >= nbrOfPosts;

  return json({ posts, page, isLastPage });
};

export const meta: MetaFunction = ({ matches }) => {
  const parentMeta = matches
    .flatMap((match) => match.meta ?? [])
    .filter((meta) => !('title' in meta));
  return [...parentMeta, { title: "Toute l'actualité" }];
};

const News = () => {
  const { posts, page, isLastPage } = useLoaderData<typeof loader>();

  return (
    <>
      <Headband
        title="Toute l'actualité"
        breadcrumb={[{ link: '/actualite', label: "Toute l'actualité" }]}
      />
      <main className={styles.main}>
        <div className={styles.posts}>
          {posts.map((post, idx) => (
            <Post
              key={post.id}
              size={idx % 4 == 0 ? 'lg' : undefined}
              className={clsx(idx % 4 == 0 && styles.inTheNews)}
              post={post}
            />
          ))}
        </div>
        <div className={styles.postsBtnContainer}>
          {!isLastPage ? (
            <Button as={Link} to={`/actualite?page=${page + 1}`}>
              Articles suivants
            </Button>
          ) : null}
        </div>
      </main>
    </>
  );
};

export default News;
