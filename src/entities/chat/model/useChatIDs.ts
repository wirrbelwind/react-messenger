import { FirestoreError, query, where } from "firebase/firestore"
import { useCollection } from "react-firebase-hooks/firestore"
import firebase from "shared/api"
import { IBaseChat } from "shared/libs/interfaces/chats"
import { IUser } from "shared/libs/interfaces/users"

interface useChatIDsResult {
	loading: undefined | boolean
	error: undefined | string | FirestoreError
	data: undefined | string[]
} 

export const useChatIDs = (userID: string) => {
	const result: useChatIDsResult = {
		data: undefined, 
		loading: undefined, 
		error:undefined
	}

	const userRef = firebase.firestoreAPI.getDocRef<IUser>('users',userID);
	const condition = where('users', 'array-contains', userRef)
	const colRef = firebase.firestoreAPI.collection<IBaseChat>('chat_base')
	const q = query(colRef,condition)

	const [baseChats, baseLodaing, baseError] = useCollection(q)
	
	result.data = baseChats?.docs.map(chat => chat.id)
	result.loading ||= baseLodaing
	result.error ||= baseError
	
	return result
}