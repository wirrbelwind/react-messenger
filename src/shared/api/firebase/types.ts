import { WhereFilterOp } from "firebase/firestore"
import { Condition, ReadOptions } from "../types"

export interface IFirebaseConfig extends Record<string, string> {
	apiKey: string
	authDomain: string
	projectId: string
	storageBucket: string
	messagingSenderId: string
	appId: string

	measurementId: string
}
export interface FirebaseReadOptions extends ReadOptions {
	conditions: FirestoreCondition[]
}

export interface FirestoreCondition extends Condition {
	field: string;
	operator: WhereFilterOp;
	value: any;
}
