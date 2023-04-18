import { FirebaseApp, initializeApp } from "firebase/app";
import { collection, QueryDocumentSnapshot, CollectionReference, Firestore, FirestoreDataConverter, getFirestore, getDoc, queryEqual, query, where, WhereFilterOp, getDocs } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";
import { IBackendAPI, EntityName, Condition } from "../interface";
import { firebaseConfig } from "./config";

const app = initializeApp(firebaseConfig);
export interface IFirebaseConfig extends Record<string, string> {
	apiKey: string
	authDomain: string
	projectId: string
	storageBucket: string
	messagingSenderId: string
	appId: string

	measurementId: string
}

export const authModule = getAuth(app)
export const db = getFirestore(app)

export const getUser = () => {
	return authModule.currentUser
}

interface ReadOptions {
	conditions: FirestoreCondition[]
}

interface FirestoreCondition extends Condition {
	field: string;
	operator: WhereFilterOp;
	value: any;
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

	public async read<EntityType extends Object>(entity: EntityName, options: ReadOptions)
		: Promise<EntityType> {
		const collection = this.getCollection<EntityType>(entity)

		const conditions = options.conditions.map(({ field, operator, value }) => where(field, operator, value))
		const q = query(collection, ...conditions)

		const snapshot = await getDocs(q)

		const data = snapshot.docChanges().map(value => value.doc.data())
	}
	public write() {
	}
	public delete() {
	}

	getCollection<T>(entity: EntityName) {
		return collection(this.db, entity).withConverter(converter<T>())
	}
}

function converter<T>(): FirestoreDataConverter<T> {
	return {
		toFirestore: (data: T) => data,
		fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T
	}
}