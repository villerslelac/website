import { Link } from '@remix-run/react';
import clsx from 'clsx';

import { Post as IPost } from 'app/types';
import formatDate from 'app/utils/formatDate';
import { useRootContext } from 'app/utils/useRootContext';

import { ContentBlock } from '../ContentBlock/ContentBlock';
import styles from './Post.module.scss';

interface PostProps {
  post: IPost;
  size?: 'lg';
  className?: string;
}

export const Post: React.FC<PostProps> = ({ size, className, post }) => {
  const { directusUrl } = useRootContext();

  return (
    <article
      className={clsx(size == 'lg' ? styles.largePost : styles.post, className)}
    >
      <Link className={styles.imageLink} to={`/actualite/${post.slug}`}>
        {post.featured_image ? (
          <img
            className={styles.image}
            src={`${directusUrl}/assets/${post.featured_image}?key=og-image`}
            alt={post.title}
          />
        ) : (
          <img
            className={styles.image}
            src="/default-post-background.png"
            alt={post.title}
          />
        )}
      </Link>
      <Link className={styles.content} to={`/actualite/${post.slug}`}>
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
        {size == 'lg' ? <ContentBlock html={post.excerpt} size="sm" /> : null}
        <footer className={styles.meta}>
          <time className={styles.metaTime}>
            {formatDate(post.date_published)}
          </time>
        </footer>
      </Link>
    </article>
  );
};
