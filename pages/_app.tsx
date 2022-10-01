import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Header from '../components/Header'
import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'
import { Toaster } from 'react-hot-toast'

/**
 * Wrapping "MyApp" with "SessionProvider" will make session available to all pages 
 * and components in the application without the need to use the getSession in getServerSideProps or getStaticProps.
 * This allows us to use the session and hooks from next-auth/react inside our _app.tsx.
*/


/**
 * MyApp is a function that takes in a Component and pageProps, and returns a SessionProvider component
 * that takes in a session prop and a Component component that takes in pageProps
 * @param {AppProps}  - AppProps
 * @returns A higher order component that wraps the component that is being rendered.
 */

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  /* A higher order component design that wraps the component that is being rendered. */
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={pageProps.session}>

        <Toaster/>

        {/* Header will appear in each page */}
        <div className='h-screen overflow-y-scroll bg-slate-200'>
          {/* h-screen : height of the screen
              overflow-y-scroll : allow the page to scroll vertically
              bg-slate-200 : background color of the page
          */}
          <Header/>
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </ApolloProvider>
  )
}

export default MyApp
