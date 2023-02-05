import { fetchApi } from '../config/axios'
import { Login } from '../interfaces/auth.interfaces'


export const login = async (loginBody: Login) => {
    const resp = fetchApi.post('/auth/login', loginBody)
    return resp
}