import clsx from 'clsx';
import styles from './Article.module.scss'
import Link from 'next/link';

interface ArticleProps {
  size?: 'lg';
  className?: string;
}

export const Article: React.FC<ArticleProps> = ({ size, className }) => (
  <article className={clsx(size == 'lg' ? styles.largeArticle : styles.article, className)}>
    <Link className={styles.imageLink} href="#">
      <img className={styles.image} src="http://via.placeholder.com/1200x630" alt="Image de test" />
    </Link>
    <Link className={styles.content} href="#">
      <header>
        <div className={styles.tags}>
          <span className={styles.tag}>Actualité</span>
        </div>
        <h3 className={styles.title}>Titre de l&apos;article</h3>
      </header>
      {size == 'lg' ?
        <div className={styles.excerpt}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer faucibus et lorem sit amet lobortis. Quisque et quam diam. Aenean porta semper ex, ut viverra nisi venenatis eu.
        </div>
      : null}
      <footer className={styles.meta}>
        <time className={styles.metaTime}>10 octobre 2023</time>
      </footer>
    </Link>
  </article>
);
