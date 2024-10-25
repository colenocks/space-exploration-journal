import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_PATH ?? "/api"
})

class APIClient<T> {
    private endpoint: string

    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

    getAll = async (config?: AxiosRequestConfig) => {
        return axiosInstance.get<T[]>(this.endpoint, config).then(res => res.data)
    }
}

export default APIClient
