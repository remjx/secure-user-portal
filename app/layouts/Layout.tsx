import { ReactNode } from "react"
import { Head } from "blitz"
import { Box } from '@chakra-ui/react';
import { Logo } from '../components/Logo/index';

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "secure-user-portal"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box align="center">
        <Logo />
        <div>
          {children}
        </div>
      </Box>
    </>
  )
}

export default Layout
