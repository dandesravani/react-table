import { Button, Flex, Heading } from '@chakra-ui/react'
import { signIn, getProviders } from 'next-auth/react'
import React from 'react'

export const Signin = () => {
  const [providers, setProviders] = React.useState<
    Awaited<ReturnType<typeof getProviders>> | undefined
  >()

  React.useEffect(() => {
    getProviders().then(
      providers => providers != null && setProviders(providers),
    )
  }, [])

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="100vh"
      w="100wh"
      backgroundColor="pink"
      bgGradient="radial(gray.300, yellow.400, pink.200)"
    >
      <Flex direction="column">
        <Heading mb="5px">Hi, Welcome</Heading>
        <Button
          colorScheme="pink"
          onClick={() => signIn('google', { callbackUrl: '/excel' })}
        >
          Signin
        </Button>
      </Flex>
    </Flex>
  )
}
