'use server';

import { readFile, readItems } from '@directus/sdk';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ContentBlock, Headband } from '../../components';
import { Post as IPost } from '../../types';
import directus from '../../utils/directus';
import formatDate from '../../utils/formatDate';
import styles from './page.module.scss';

type Props = {
  params: { slug: string };
};

const getPost = async (slug: string) => {
  try {
    const post = await directus.request(
      readItems('post', {
        filter: {
          slug: slug,
        },
        fields: ['*', 'tag.*'],
      }),
    );
    if (post.length != 1) {
      notFound();
    }
    return post[0];
  } catch (error) {
    notFound();
  }
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const post = await getPost(params.slug);
  return {
    title: post.title,
  };
};

const Post = async ({ params }: Props) => {
  const post = (await getPost(params.slug)) as IPost;

  let featuredImage = undefined;
  if (post.featured_image) {
    featuredImage = await directus.request(readFile(post.featured_image));
  }

  return (
    <>
      <Headband
        title={post.title}
        breadcrumb={[
          { link: '/actualite', label: "Toute l'actualité" },
          { link: `/actualite/${params.slug}`, label: post.title },
        ]}
      />
      <div className={styles.metadata}>
        <span className={styles.tag}>
          <span
            className={styles.tagColor}
            style={{ backgroundColor: post.tag.color }}
          />
          {post.tag.name}
        </span>
        <time className={styles.metaTime}>
          Publié le {formatDate(post.date_published)}
        </time>
      </div>
      <main className={styles.main}>
        {featuredImage ? (
          <img
            className={styles.featuredImage}
            src={`${process.env.DIRECTUS_URL}/assets/${post.featured_image}`}
            alt={featuredImage.title}
          />
        ) : null}
        <ContentBlock html={post.content} />
      </main>
    </>
  );
};

export default Post;
