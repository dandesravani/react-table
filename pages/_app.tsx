import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  )
}
export default MyApp
