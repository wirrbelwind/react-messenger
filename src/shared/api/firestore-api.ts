import { DocumentReference, Firestore, QueryConstraint, Unsubscribe, collection, doc, getDoc, getDocs, getFirestore, limit, onSnapshot, query } from "firebase/firestore";
import { IBaseChat, IGroupChat, IGroupChatData, IPrivateChat, IPrivateChatData } from "shared/libs/interfaces/chats";
import { IMessage } from "shared/libs/interfaces/messages";
import { IUser } from "shared/libs/interfaces/users";
import { converter } from "./firebase-converter";

// export type WithoutID<T> = Omit<T, 'id'>
type collectionName = 'users' | 'chat_base' | 'chat_private' | 'chat_group' | 'messages'
type collectionType = IUser | IBaseChat | IGroupChatData | IPrivateChatData | IMessage

export class FirestoreApi {
	private static instance: FirestoreApi;
	private db: ReturnType<typeof getFirestore>;

	constructor(firestore: Firestore) {
		this.db = firestore
	}
	public getDocRef<T extends collectionType>(collectionName: collectionName, documentId: string) {
		return doc(this.db, collectionName, documentId).withConverter(converter<T>())
	}

	public async readOneByID<T extends collectionType>(collectionName: collectionName, documentId: string): Promise<T | undefined> {
		const docRef = doc(this.db, collectionName, documentId).withConverter(converter<T>())
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const result = docSnap.data() 
			return result;
		}
	}

	public async readOneByQuery<T extends collectionType>(collectionName: collectionName, ...queryConstraints: QueryConstraint[]) {
		const q = query(collection(this.db, collectionName), ...queryConstraints, limit(1)).withConverter(converter<T>())

		const querySnapshot = await getDocs(q);
		const doc = querySnapshot.docs[0]

		const result = doc.data()
		return result
	}

	public async readMany<T extends collectionType>(collectionName: collectionName, ...queryConstraints: QueryConstraint[]): Promise<T[]> {
		const q = query(collection(this.db, collectionName), ...queryConstraints);

		const querySnapshot = await getDocs(q);
		const result = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		return result as T[];
	}
	public async findByDocRef<T extends collectionType>(docRef: DocumentReference<T>) {
		return (await getDoc(docRef)).data()
	}

	public subscribe<T extends collectionType>(collectionName: collectionName, callback: (updatedDocument: T) => void, ...queryConstraints: QueryConstraint[]): Unsubscribe {
		const q = query(collection(this.db, collectionName), ...queryConstraints)

		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			querySnapshot.docChanges().forEach((change) => {
				const documentId = change.doc.id
				const data = change.doc.data()
				if (change.type === "added" || change.type === "modified" || change.type === "removed") {
					callback({ id: documentId, ...data } as T)
				}
			})
		})
		return unsubscribe;
	}

	public collection<T extends collectionType>(collectionName: collectionName) {
		const coll = collection(this.db, collectionName).withConverter(converter<T>())
		return coll;
	}
}
