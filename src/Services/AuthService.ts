import $api from "../Helpers/api/api";
import axios, { AxiosResponse } from 'axios';
import { AuthResponse } from "../Interfaces/AuthResponse";
import { API_URL } from "../Consts";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', { email, password })
    }

    static async registration(email: string, password: string, nickname: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/registration', { email, password, nickname })
    }

    static async logout(): Promise<void> {
        return $api.post('/logout')
    }
    
    static async toRefreshToken() {
        return axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true })
    }
}