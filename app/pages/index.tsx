import { Suspense, useEffect } from 'react';
import { Link, BlitzPage, useRouter } from "blitz"
import Layout from "app/layouts/Layout"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Button, Flex } from '@chakra-ui/react';

const Home: BlitzPage = () => {
  const router = useRouter();
  const currentUser = useCurrentUser()
  // useEffect(() => {
  //   if (currentUser) router.push('/dashboard');
  // });
  return <span>'test'</span>
  return (
    <main>
      <Suspense fallback="Loading...">
        <Flex align="center">
          <Link href="/signup">
            <a>
              <Button>
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

      </Suspense>
    </main>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
