import axios from 'axios';
import { API_URL, PREFIX } from '../../Consts';
import { AuthResponse } from "../../Interfaces/AuthResponse";
// import { store } from "../index";


const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(PREFIX + 'token')}`
    
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true })
            localStorage.setItem(PREFIX + 'token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
        }
    }
    throw error
})

export default $api;
