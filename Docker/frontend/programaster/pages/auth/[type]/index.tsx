import { useRouter } from 'next/router'
import MainLayout from '@/components/layouts/common/MainLayout'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Forgotpasswordview from '@/components/Forgotpasswordview'


const Post = () => {
    const router = useRouter()
    const type = router.query.type as string
    console.log(type)

   if (type === 'login') {
    return(
        <>
            <MainLayout />
            <Login />

        </>
    )
   } else if (type === 'signup') {
    return (
        <> 
            <MainLayout />
            <Signup />
        </>

    )
   } else if (type === 'forgotpasswordview') {
    return (
        <> 
            <MainLayout />
            <Forgotpasswordview />
        </>

    )
   } 
}

export default Post