import $api from "../Helpers/api/api";
import { AxiosResponse } from 'axios';
import { IUser } from "../Models/IUser";

export default class SearchService {
    static gethUsersByQuery(query: string): Promise<AxiosResponse<IUser[]>> {
        return $api.post<IUser[]>('/users', {query})
    }
}

