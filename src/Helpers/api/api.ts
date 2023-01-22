import axios from 'axios';
import { API_URL, PREFIX } from '../../Config/config';
import { IUser } from '../../Models/IUser';
// import { store } from "../index";


const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

// $api.interceptors.request.use((config: any) => {
//     config.headers.Authorization = `Bearer ${localStorage.getItem(PREFIX + 'token')}`
    
//     return config;
// })

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            await axios.get(`${API_URL}/refresh`, { withCredentials: true })
            
            return $api.request(originalRequest);
        } catch (e) {
        }
    }
    throw error
})

export default $api;