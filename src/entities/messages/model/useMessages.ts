import { useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { collection, doc, limit, orderBy, query, Unsubscribe, where } from "firebase/firestore"
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore"
import firebase from "shared/api"
import { IBaseChat } from "shared/libs/interfaces/chats"
import { IMessage } from "shared/libs/interfaces/messages"

export function useMessages(chatID: string) {
	const chatDocRef = firebase.firestoreAPI.getDocRef<IBaseChat>('chat_base', chatID)
	const msgColl = firebase.firestoreAPI.collection<IMessage>('messages')

	const msgQuery = query(
		msgColl,
		where('chat', '==', chatDocRef),
		orderBy("timestamp", "asc")
	)
	const hook = useCollectionData(msgQuery)
	return hook
}