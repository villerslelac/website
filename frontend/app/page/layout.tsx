import styles from './layout.module.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className={styles.headband}>
        <ul className={styles.breadcrumb}>
          <li><a href="#">Home</a></li>
          <li><a href="#">Page</a></li>
          <li>Page courante</li>
        </ul>
        <h1>Mon titre</h1>
      </div>
      {children}
    </>
  )
}
