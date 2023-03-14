import { useQuery } from "@tanstack/react-query"
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import { useNavigate } from "react-router"
import { tanstackKeys } from "shared/consts/tanstack-keys"
import { authModule, db, getUser } from "shared/firebase"
import { useUser } from "shared/libs/hooks/useUser"
import { ChatBriefing, Message } from "shared/types"
import { isDirectChat } from "./lib"


export const useList = () => useQuery<ChatBriefing[]>({
	queryFn: async () => {
		const uid = getUser()?.uid
		if (!uid) {
			useNavigate()('/signin')
			throw new Error('uid is null')
		}

		const userRef = doc(db, 'users', uid)
		//access to collection 'chats'
		const chatsRef = collection(db, 'chats')

		//make a query that requests all the chats where current user consists in
		console.log(authModule.currentUser);

		const q = query(chatsRef, where("usersID", "array-contains", userRef))
		const chatlistSnapshot = await getDocs(q)
		//empty array for chats
		let chats: ChatBriefing[] = []

		//filling the array by found chats
		chatlistSnapshot.forEach(async chatShanphot => {
			const chat: ChatBriefing = {
				...chatShanphot.data() as ChatBriefing,
				id: chatShanphot.id,
			}
			const chatRef = doc(db, 'chats', chatShanphot.id)

			//find messages
			const messagesQuery = query(
				collection(db, 'messages'),
				where("chatID", "==", chatRef), orderBy("timestamp", "desc"), limit(1)
			)
			const messagesSnapshot = await getDocs(messagesQuery)
			messagesSnapshot.forEach(msg => chat.lastMessage = msg.data() as Message)
			chats.push(chat)

		})
		console.log(chats);
		
		return chats
	},
	queryKey: tanstackKeys.CHATLIST.GET_LIST
})

function getCompanionIntoChat(companionID: string) {

}