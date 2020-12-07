import { ReactNode } from "react"
import { Head } from "blitz"
import { Box, Container } from "@chakra-ui/react"
import { Logo } from "app/components/Logo"

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
        <Container bg="gray.100" mt={6} py={2}>
          {children}
        </Container>
      </Box>
    </>
  )
}

export default Layout
