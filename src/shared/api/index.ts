import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "shared/configs/firebase.config";
import { FirestoreApi } from "./firestore-api";

const appModule = initializeApp(firebaseConfig)
const authModule = getAuth(appModule)
const dbModule = getFirestore(appModule)
const firestoreAPI = new FirestoreApi(dbModule)

const firebase = {
	appModule,
	authModule,
	dbModule,
	firestoreAPI
}

export default firebase