import styles from './Footer.module.scss'
import Image from 'next/image'
import Link from 'next/link';

export const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.socialLinksWrapper}>
      <div className={styles.socialLinks}>
        <h5>Suivez-nous<br/>sur les réseaux sociaux</h5>
        <ul>
          <li>
            <a href="#" className={styles.facebook}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="2rem">
                <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"/>
              </svg>
            </a>
          </li>
          <li>
            <a href="#" className={styles.youtube}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="2rem">
                <path d="M186.8 202.1l95.2 54.1-95.2 54.1V202.1zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-42 176.3s0-59.6-7.6-88.2c-4.2-15.8-16.5-28.2-32.2-32.4C337.9 128 224 128 224 128s-113.9 0-142.2 7.7c-15.7 4.2-28 16.6-32.2 32.4-7.6 28.5-7.6 88.2-7.6 88.2s0 59.6 7.6 88.2c4.2 15.8 16.5 27.7 32.2 31.9C110.1 384 224 384 224 384s113.9 0 142.2-7.7c15.7-4.2 28-16.1 32.2-31.9 7.6-28.5 7.6-88.1 7.6-88.1z"/>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className={styles.wrapper}>
      <div className={styles.body}>
        <div className={styles.logo}>
          <Link href="/"><Image src="/villers-le-lac-logo.svg" alt="Logo de Villers-le-Lac" width={120} height={120}/></Link>
        </div>
        <p className={styles.info}>Votre mairie est ouverte de 8h30 à 12h et de 13h30 à 17h30 du lundi au vendredi</p>
      </div>
      <div className={styles.bottom}>
        <div className={styles.links}>
          <ul className={styles.linksList}>
            <li><Link href="#">Plan du site</Link></li>
            <li><a href="mailto:etatcivil@mairie-vll.fr">Nous contacter</a></li>
            <li><Link href="#">Mentions légales</Link></li>
            <li><Link href="#">Données personnelles</Link></li>
          </ul>
        </div>
        <div className={styles.credit}>
          <p>Développé par la Mairie de Villers-le-Lac</p>
        </div>
      </div>
    </div>
  </footer>
);
