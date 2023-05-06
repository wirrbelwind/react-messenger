import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, WithFieldValue } from "firebase/firestore";
import { WithoutID } from "shared/libs/interfaces/chats";

export function converter<T extends DocumentData>(): FirestoreDataConverter<WithoutID<T>> {
	return {
		toFirestore(data: T): DocumentData {
			return { ...data };
		},
		fromFirestore(snapshot: QueryDocumentSnapshot<T>, options: SnapshotOptions): WithoutID<T> {
			const data = snapshot.data(options);
			console.log('converter', data);

			return data as WithoutID<T>
		},
	}
}
