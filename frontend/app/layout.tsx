import './styles/main.scss'
import type { Metadata } from 'next'
import { Great_Vibes, Yeseva_One } from 'next/font/google'
import { Footer, Header } from './components';
import clsx from 'clsx';

const greatVibes = Great_Vibes({ subsets: ['latin'], weight: ['400'], variable: '--font-cursive', });
const yesevaOne = Yeseva_One({ subsets: ['latin'], weight: ['400'], variable: '--font-serif', });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={clsx(yesevaOne.variable, greatVibes.variable)}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
