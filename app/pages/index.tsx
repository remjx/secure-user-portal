import { Suspense, useEffect } from "react"
import { Link, BlitzPage, useRouter } from "blitz"
import Layout from "app/layouts/Layout"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Button, Flex } from "@chakra-ui/react"

const HomeForm = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  useEffect(() => {
    if (currentUser) router.push("/profile")
  })
  return (
    <Flex align="center" justify="center">
      <Link href="/signup">
        <a>
          <Button mr={4}>
            <strong>Sign Up</strong>
          </Button>
        </a>
      </Link>
      <Link href="/login">
        <a>
          <Button>
            <strong>Log in</strong>
          </Button>
        </a>
      </Link>
    </Flex>
  )
}

const Home: BlitzPage = () => {
  return (
    <main>
      <Suspense fallback="Loading...">
        <HomeForm />
      </Suspense>
    </main>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
