import Image from 'next/image';
import Link from 'next/link';

import styles from './Footer.module.scss';

export const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.socialLinksWrapper}>
      <div className={styles.socialLinks}>
        <h5>
          Suivez-nous
          <br />
          sur les réseaux sociaux
        </h5>
        <ul>
          <li>
            <a
              href="https://www.facebook.com/VilledeVillersleLac"
              className={styles.facebook}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 96 96"
                width="2rem"
              >
                <path d="M56.3,63.36v32.64h29.41c5.68,0,10.29-4.61,10.29-10.29V10.29c0-5.68-4.61-10.29-10.29-10.29H10.29C4.61,0,0,4.61,0,10.29V85.71c0,5.68,4.61,10.29,10.29,10.29h29.41V63.36h-13.5v-15.36h13.5v-11.71c0-13.32,7.93-20.67,20.07-20.67,5.82,0,11.9,1.04,11.9,1.04v13.07h-6.7c-6.6,0-8.66,4.1-8.66,8.3v9.97h14.74l-2.36,15.36h-12.38Z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/@VilledeVillersleLac"
              className={styles.youtube}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 96 96"
                width="2rem"
              >
                <path d="M40.03,36.45l20.4,11.59-20.4,11.59v-23.19ZM96,10.29V85.71c0,5.68-4.61,10.29-10.29,10.29H10.29c-5.68,0-10.29-4.61-10.29-10.29V10.29C0,4.61,4.61,0,10.29,0H85.71c5.68,0,10.29,4.61,10.29,10.29Zm-9,37.78s0-12.77-1.63-18.9c-.9-3.39-3.54-6.04-6.9-6.94-6.06-1.65-30.47-1.65-30.47-1.65,0,0-24.41,0-30.47,1.65-3.36,.9-6,3.56-6.9,6.94-1.63,6.11-1.63,18.9-1.63,18.9,0,0,0,12.77,1.63,18.9,.9,3.39,3.54,5.94,6.9,6.84,6.06,1.63,30.47,1.63,30.47,1.63,0,0,24.41,0,30.47-1.65,3.36-.9,6-3.45,6.9-6.84,1.63-6.11,1.63-18.88,1.63-18.88Z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/villerslelac/"
              className={styles.github}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 96 96"
                width="2rem"
              >
                <path d="M85.71,0H10.29C4.61,0,0,4.61,0,10.29V85.71c0,5.68,4.61,10.29,10.29,10.29h23.02v-.04c2.03,.2,2.8-1.18,2.8-2.37,0-1.12-.08-4.97-.08-8.97-13.36,2.89-16.15-5.77-16.15-5.77-2.15-5.61-5.33-7.05-5.33-7.05-4.37-2.96,.32-2.96,.32-2.96,4.85,.32,7.4,4.97,7.4,4.97,4.29,7.37,11.21,5.29,14,4.01,.4-3.13,1.67-5.29,3.02-6.49-10.66-1.12-21.87-5.29-21.87-23.88,0-5.29,1.91-9.61,4.93-12.98-.48-1.2-2.15-6.17,.48-12.82,0,0,4.06-1.28,13.2,4.97,3.92-1.06,7.95-1.6,12.01-1.6,4.06,0,8.19,.56,12.01,1.6,9.15-6.25,13.2-4.97,13.2-4.97,2.63,6.65,.95,11.62,.48,12.82,3.1,3.36,4.93,7.69,4.93,12.98,0,18.59-11.21,22.68-21.95,23.88,1.75,1.52,3.26,4.41,3.26,8.97,0,6.49-.08,11.7-.08,13.3,0,1.15,.72,2.48,2.59,2.4v.02h23.24c5.68,0,10.29-4.61,10.29-10.29V10.29c0-5.68-4.61-10.29-10.29-10.29ZM10.52,80.27v-.05s.03,.04,.05,.05h-.05Z" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className={styles.wrapper}>
      <div className={styles.body}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/villers-le-lac-logo.svg"
              alt="Logo de Villers-le-Lac"
              width={120}
              height={120}
            />
          </Link>
        </div>
        <p className={styles.info}>
          Votre mairie est ouverte de 8h30 à 12h et de 13h30 à 17h30 du lundi au
          vendredi
        </p>
      </div>
      <div className={styles.bottom}>
        <div className={styles.links}>
          <ul className={styles.linksList}>
            <li>
              <Link href="/contact">Nous contacter</Link>
            </li>
            <li>
              <Link href="/mentions-legales">Mentions légales</Link>
            </li>
            <li>
              <Link href="/donnees-personnelles">Données personnelles</Link>
            </li>
          </ul>
        </div>
        <div className={styles.credit}>
          <p>Développé par la Mairie de Villers-le-Lac - v3.0.0</p>
        </div>
      </div>
    </div>
  </footer>
);
