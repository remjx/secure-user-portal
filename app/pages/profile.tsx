import { BlitzPage, useRouter, useMutation } from 'blitz';
import { Button } from '@chakra-ui/react';
import Layout from '../layouts/Layout';
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/hooks/useCurrentUser"

const Profile: BlitzPage = () => {
    const router = useRouter();
    const currentUser = useCurrentUser()
    const [logoutMutation] = useMutation(logout)
    if (!currentUser) router.push('/')
    return (
        <>
            <Button
                onClick={async () => {
                    await logoutMutation()
                }}
            >
                Logout
            </Button>
            <div>
                User id: <code>{currentUser?.id}</code>
                <br />
                User role: <code>{currentUser?.role}</code>
            </div>
        </>
    )

}

Profile.getLayout = (page) => <Layout title="Profile">{page}</Layout>

export default Profile