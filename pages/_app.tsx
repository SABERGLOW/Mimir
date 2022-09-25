import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

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
  /* A higher order component that wraps the component that is being rendered. */
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
