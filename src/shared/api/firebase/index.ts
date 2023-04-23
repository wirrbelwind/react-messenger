import { FirebaseApp, initializeApp } from "firebase/app";
import { collection, Firestore, getFirestore, query, where, getDocs, DocumentData } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";
import { firebaseConfig } from "./config";
import { IBackendAPI, EntityName } from "../types";
import { FirebaseReadOptions, IFirebaseConfig } from "./types";
import { converter } from "./lib";

const app = initializeApp(firebaseConfig);

export const authModule = getAuth(app)
export const db = getFirestore(app)

export const getUser = () => {
	return authModule.currentUser
}

class FirebaseAPI implements IBackendAPI {
	app: FirebaseApp
	auth: Auth
	db: Firestore

	constructor(config: IFirebaseConfig) {
		this.app = initializeApp(config)
		this.auth = getAuth(this.app)
		this.db = getFirestore(this.app)
	}

	public async read<EntityType extends DocumentData>(entity: EntityName, options: FirebaseReadOptions)
		: Promise<EntityType> {
		const collection = this.getCollection<EntityType>(entity)

		const conditions = options.conditions.map(({ field, operator, value }) => where(field, operator, value))
		const q = query(collection, ...conditions)

		const snapshot = await getDocs(q)

		const data = snapshot.docChanges()[0].doc.data()

		return data
	}
	public write() {
	}
	public delete() {
	}

	getCollection<T extends DocumentData>(entity: EntityName) {
		return collection(this.db, entity).withConverter(converter<T>())
	}
}
