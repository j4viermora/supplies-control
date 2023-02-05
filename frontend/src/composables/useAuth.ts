import * as auth from '../api/auth'
import { Login } from '../interfaces/auth.interfaces'
import { useRouter } from 'vue-router'

export const useAuth = () => {
    const router = useRouter()

    const login = async (body: Login) => {
        try {

            const { data } = await auth.login({
                email: body.email,
                password: body.password
            })

            data.tokem && localStorage.setItem('auth-token', data.token)
            router.push('/app')

        } catch (error) {
            return error
        }
    }

    return {
        login,
    }
}