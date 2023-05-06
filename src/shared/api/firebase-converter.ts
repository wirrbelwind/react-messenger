import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, WithFieldValue } from "firebase/firestore";

export function converter<T extends DocumentData>(): FirestoreDataConverter<T> {
	return {
		toFirestore(data: WithFieldValue<T>): DocumentData {
			return { ...data };
		},
		fromFirestore(snapshot: QueryDocumentSnapshot<T>, options: SnapshotOptions): T {
			const data = snapshot.data(options);
			return { ...data, id: snapshot.id } as T
		},
	}
}
