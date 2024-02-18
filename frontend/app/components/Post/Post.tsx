import { readFile } from '@directus/sdk';
import clsx from 'clsx';
import Link from 'next/link';

import { Post as IPost } from '../../types';
import directus from '../../utils/directus';
import formatDate from '../../utils/formatDate';
import styles from './Post.module.scss';

interface PostProps {
  size?: 'lg';
  className?: string;
  post: IPost;
}

export const Post: React.FC<PostProps> = async ({ size, className, post }) => {
  let featuredImage = undefined;
  if (post.featured_image) {
    featuredImage = await directus.request(readFile(post.featured_image));
  }

  return (
    <article
      className={clsx(size == 'lg' ? styles.largePost : styles.post, className)}
    >
      <Link className={styles.imageLink} href="#">
        {featuredImage ? (
          <img
            className={styles.image}
            src={`${process.env.DIRECTUS_URL}/assets/${post.featured_image}?key=og-image`}
            alt={featuredImage.title}
          />
        ) : (
          <img
            className={styles.image}
            src="/default-post-background.png"
            alt={post.title}
          />
        )}
      </Link>
      <Link className={styles.content} href="#">
        <header>
          <div className={styles.tags}>
            <span className={styles.tag}>
              <span
                className={styles.tagColor}
                style={{ backgroundColor: post.tag.color }}
              />
              {post.tag.name}
            </span>
          </div>
          <h3 className={styles.title}>{post.title}</h3>
        </header>
        {size == 'lg' ? (
          <div
            className={styles.excerpt}
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
        ) : null}
        <footer className={styles.meta}>
          <time className={styles.metaTime}>
            {formatDate(post.date_published)}
          </time>
        </footer>
      </Link>
    </article>
  );
};
