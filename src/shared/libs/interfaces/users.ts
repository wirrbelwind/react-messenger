import { User as FirebaseCurrentUser } from "firebase/auth";

export type Viewer = FirebaseCurrentUser

export interface IUser {
	id: string
	name: string
	photoURL?: string		
}

// export interface ICompanion extends Omit<User, 'id'> {
// 	companionID: string
// 	name: string
// 	photoURL?: string
// }