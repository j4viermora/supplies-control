import * as auth from '../api/auth'
import { Login } from '../interfaces/auth.interfaces'

export const useAuth = () => {

    const login = async (body: Login) => {
        try {

            const resp = await auth.login({
                email: body.email,
                password: body.password
            })

        } catch (error) {
            return error
        }
    }

    return {
        login,
    }
}