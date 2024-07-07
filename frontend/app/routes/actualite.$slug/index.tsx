import { readFile, readItems } from '@directus/sdk';
import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json, useLoaderData } from '@remix-run/react';

import { ContentBlock, Headband } from 'app/components';
import { Post as PostType } from 'app/types';
import directus from 'app/utils/directus';
import formatDate from 'app/utils/formatDate';
import { useRootContext } from 'app/utils/useRootContext';

import styles from './index.module.scss';

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
      throw new Response('Not Found', { status: 404, statusText: 'Not Found' });
    }
    return post[0];
  } catch (error) {
    throw new Response('Not Found', { status: 404, statusText: 'Not Found' });
  }
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const post = (await getPost(params.slug ?? '')) as PostType;

  let featuredImage = undefined;
  if (post.featured_image) {
    featuredImage = await directus.request(readFile(post.featured_image));
  }

  return json({ post, featuredImage });
};

export const meta: MetaFunction<typeof loader> = ({ matches, data }) => {
  const parentMeta = matches
    .flatMap((match) => match.meta ?? [])
    .filter((meta) => !('title' in meta));
  if (!data?.post?.title) {
    return parentMeta;
  }
  return [...parentMeta, { title: data.post?.title }];
};

const Post = () => {
  const { directusUrl } = useRootContext();
  const { post, featuredImage } = useLoaderData<typeof loader>();

  return (
    <>
      <Headband
        title={post.title}
        breadcrumb={[
          { link: '/actualite', label: "Toute l'actualité" },
          { link: `/actualite/${post.slug}`, label: post.title },
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
            src={`${directusUrl}/assets/${post.featured_image}`}
            alt={featuredImage.title}
          />
        ) : null}
        <ContentBlock html={post.content} />
      </main>
    </>
  );
};

export default Post;
