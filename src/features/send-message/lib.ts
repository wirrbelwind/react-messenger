import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addDoc, collection, getDoc } from "firebase/firestore"
import { tanstackKeys } from "shared/consts/tanstack-keys"
import { db, getUser } from "shared/api/firebase"
import { IMessage, IPendingMessage } from "shared/libs/types"

async function sendMessage(msg: IPendingMessage) {

	const msgRef = await addDoc(collection(db, "messages"), msg)
	return (await getDoc(msgRef)).data() as IMessage
}

export function useCreateMessage(chatID: string) {
	return useMutation<
		IMessage | undefined, //returns
		unknown, // error
		{ msg: IPendingMessage } // mutate vars
	>({
		mutationFn: ({ msg }) => sendMessage(msg),
		mutationKey: tanstackKeys.MESSAGES.SEND(chatID),
	})
}
