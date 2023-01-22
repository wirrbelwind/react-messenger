import $api from "../Helpers/api/api";
import axios, { AxiosResponse } from 'axios';
import { API_URL } from "../Config/config";
import { IUser } from "../Models/IUser";
import { signupForm } from "../Models/SignupData";

export default class AuthService {
    static async login(login: string, password: string): Promise<AxiosResponse<IUser>> {
        return $api.post('/login', { login, password })
    }

    static async registration(signupData: signupForm): Promise<AxiosResponse<IUser>> {
        const formData = new FormData()

        for (const [k, v] of Object.entries(signupData)) {
            k === 'avatar' ? formData.set(k, v, 'avatar') : formData.set(k, v)
        }
        return $api.post('/registration', { formData })
    }

    static async logout(): Promise<AxiosResponse<{ success: boolean }>> {
        return $api.post('/logout')
    }

    static async refreshAccessToken(): Promise<AxiosResponse<IUser>> {
        return axios.get(`${API_URL}/refreshAccessToken`, { withCredentials: true })
    }
}