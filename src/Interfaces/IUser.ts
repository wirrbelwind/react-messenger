export interface IUser {
    email: string
    id: number
    nickname: string
    first_name: string
    last_name: string
    avatar: string
    isOnline: boolean
    about: string
    onlineTime: string
}

export interface IUpdateUser {
	email?: string
    id?: number
    nickname?: string
    first_name?: string
    last_name?: string
    avatar?: string
    isOnline?: boolean
    about?: string
    onlineTime?: string
}