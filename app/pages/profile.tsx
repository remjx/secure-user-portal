import { BlitzPage, useRouter, useMutation, useQuery } from "blitz"
import { Suspense, useEffect } from "react"
import { Button, Box, Heading, Text, UnorderedList, ListItem } from "@chakra-ui/react"
import Layout from "../layouts/Layout"
import logout from "app/auth/mutations/logout"
import getUserList from "app/users/queries/getUserList"
import { useCurrentUser } from "app/hooks/useCurrentUser"

const ProfileData = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const [userList] = useQuery(getUserList)
  useEffect(() => {
    if (!currentUser) {
      router.push("/")
    }
  })
  if (!currentUser) return null
  return (
    <>
      <Text mt={3}>
        Welcome, {currentUser.firstName} {currentUser.lastName}
      </Text>
      {currentUser.role === "superAdmin" && (
        <>
          <Text mt={3}>You are a super admin.</Text>
          {userList && (
            <Box mt={3}>
              <Text>User list:</Text>
              <UnorderedList listStylePosition="inside">
                {userList.map((user) => (
                  <ListItem key={user.email}>
                    {user.email} ({user.firstName} {user.lastName})
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
          )}
        </>
      )}
      <Button
        onClick={async () => {
          await logoutMutation()
        }}
        colorScheme="blue"
        mt={3}
      >
        Logout
      </Button>
    </>
  )
}

const Profile: BlitzPage = () => {
  return (
    <Box>
      <Heading as="h1">Profile</Heading>
      <Suspense fallback="Loading...">
        <ProfileData />
      </Suspense>
    </Box>
  )
}

Profile.getLayout = (page) => <Layout title="Profile">{page}</Layout>

export default Profile
