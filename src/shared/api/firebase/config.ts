export interface IFirebaseConfig extends Record<string, string> {
	apiKey: string
	authDomain: string
	projectId: string
	storageBucket: string
	messagingSenderId: string
	appId: string
	measurementId: string
}

export const firebaseConfig: IFirebaseConfig = {
	//Add your config here...
} as const
