'use server';

import { aggregate, readItems } from '@directus/sdk';
import clsx from 'clsx';
import { Metadata } from 'next';
import Link from 'next/link';

import { Button, Headband, Post } from '../components';
import { Posts } from '../types';
import directus from '../utils/directus';
import styles from './page.module.scss';

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

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Toute l'actualité",
  };
}

const News = async ({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) => {
  const page = searchParams?.page ? parseInt(searchParams.page) || 1 : 1;
  const posts = (await getPosts(page)) as Posts;
  const nbrOfPosts = (await getNbrOfPosts()) as number;
  const isLastPage = page * POSTS_LIMIT >= nbrOfPosts;

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
            <Button as={Link} href={`/actualite?page=${page + 1}`}>
              Articles suivants
            </Button>
          ) : null}
        </div>
      </main>
    </>
  );
};

export default News;
