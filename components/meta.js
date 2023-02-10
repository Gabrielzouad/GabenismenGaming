import Head from "next/head"

export default function Meta() {
  return (
    <Head>
      <link rel='icon' type='image/png' sizes='32x32' href='/logo.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/logo.png' />
      <link rel='manifest' href='/logo.png' />
      <link rel='mask-icon' href='/logo.png' color='#000000' />
      <link rel='shortcut icon' href='/logo.png' />
      <meta name='msapplication-TileColor' content='#000000' />
      <meta name='theme-color' content='#000' />
      <link rel='alternate' type='application/rss+xml' href='/feed.xml' />
      <meta name='description' content='Esports Gaming News, Reviews, and More | Gabenismen Gaming' />
    </Head>
  )
}
