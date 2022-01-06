import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'

export default function Component() {
  const { data: session } = useSession()

  console.log({ session })
  const router = useRouter()

  React.useEffect(() => {
    if (session) {
      router.push('/excel')
    } else {
      router.push('/signin')
    }
  }, [session])

  return null
}
