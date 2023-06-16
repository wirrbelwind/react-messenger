import { limit, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import firebase from "shared/api"
import { IBaseChat } from "shared/libs/interfaces/chats"
import { IMessage } from "shared/libs/interfaces/messages"

export function useLastMsg(chatID: string) {
	const chatDocRef = firebase.firestoreAPI.getDocRef<IBaseChat>('chat_base', chatID)
	const msgColl = firebase.firestoreAPI.collection<IMessage>('messages')

	const msgQuery = query(
		msgColl,
		where('chat', '==', chatDocRef),
		orderBy("timestamp", "desc"),
		limit(1)
	)
	const [lastMsgArr, loading, error] = useCollection(msgQuery)
	console.log('ARRAY', lastMsgArr);

	const [lastMsg, setLastMsg] = useState<undefined | IMessage>(undefined)

	useEffect(() => {
		if (lastMsgArr && lastMsgArr.docs.length > 0) {
			const msgSnapshot = lastMsgArr.docs[0]
			if (msgSnapshot.exists()) {
				const msg: IMessage = { ...msgSnapshot.data(), id: msgSnapshot.id }
				setLastMsg(msg)
			}
		}
	}, [lastMsgArr])
	
	return {lastMsg, loading, error}
}
