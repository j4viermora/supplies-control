import enviroment from '../../environment.json'

type Environment = 'local' | 'testing' | 'production'

export const getEnv = () => {
    const env: Environment = (import.meta.env.VITE_ENVIRONMENT)
    const apiURL: string = enviroment[env].base_api_url
    const baseURL: string = enviroment[env].base_url

    return {
        apiURL,
        baseURL,
        env
    }
}