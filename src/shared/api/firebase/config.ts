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
	apiKey: "AIzaSyCnZancYmemnmJAOt764iGxcTsyv_6KX9M",
	authDomain: "messenger-6ea53.firebaseapp.com",
	projectId: "messenger-6ea53",
	storageBucket: "messenger-6ea53.appspot.com",
	messagingSenderId: "313648176053",
	appId: "1:313648176053:web:f75204af22017daefd17fc",
	measurementId: "G-BLPS0MV53V"
} as const