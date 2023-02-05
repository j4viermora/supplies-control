import axios from 'axios'
import { getEnv } from '../utils'

export const fetchApi = axios.create({
    baseURL: getEnv().apiURL,
    timeout: 10000,
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('auth-token')}`
    }
})