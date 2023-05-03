import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase/firestore";

export function converter<T extends DocumentData>(): FirestoreDataConverter<T> {
	return {
		toFirestore: (data: T) => data,
		fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T
	}
}
