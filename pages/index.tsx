import type { NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed'
import PostBox from '../components/PostBox'

const Home: NextPage = () => {
  return (
    <div className="my-7 mx-auto max-w-5xl">
      {/* my-7 = margin top and bottom 7
          mx-auto = margin left and right auto 
          max-w-5xl = max width 5xl, 64rem, 1024px 
      */} 

      <Head>
        <title>Mimir</title>
        <meta name="An online knowledge hub" content="Developed with Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>

      {/* Post Box */}
      <PostBox/>


      {/* Feed */}
      <div className="flex">
        <Feed/>
      </div>

    </div>
  )
}

export default Home
