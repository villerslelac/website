'use client'

import styles from './page.module.scss'

export default function Home() {
  return (
    <main>
      <section className={styles.video}>
        <video autoPlay muted loop>
          <source src="/home.mp4" type="video/mp4" />
          Votre navigateur ne prend pas en charge la balise vidéo.
        </video>
      </section>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Découvrir<br/><span>Villers-le-Lac</span></h1>
        </div>
      </div>
    </main>
  )
}
