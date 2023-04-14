import { FirebaseApp, initializeApp } from "firebase/app";
import { collection, Firestore, getFirestore, QueryDocumentSnapshot } from "firebase/firestore"; import { getAnalytics } from "firebase/analytics";
import { Auth, getAuth } from "firebase/auth";
import { IFirebaseConfig } from "./firebase/config";

export interface IBackendAPI {
  read<T>(): Promise<T>
  write(): any
  delete(): any
}
export interface Condition {
	field: string
	operator: unknown 
	value: unknown
}
export type EntityName = /* 'user' |  */
'chat' | 'message'
