import type { NextPage } from 'next'
import Head from 'next/head'
import PostBox from '../components/PostBox'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Mimir</title>
        <meta name="An online knowledge hub" content="Developed with Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>

      {/* Post Box */}
      <PostBox/>


      {/* Feed */}
      <div>

      </div>

    </div>
  )
}

export default Home
