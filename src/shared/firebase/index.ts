// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; import { getAnalytics } from "firebase/analytics";
import config from "./config";
import { getAuth } from "firebase/auth";

const app = initializeApp(config);
const analytics = getAnalytics(app);

export const authModule = getAuth(app)
export const db = getFirestore(app);

export const getUser = () => {
	return authModule.currentUser
}