import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addDoc, collection, getDoc } from "firebase/firestore"
import { tanstackKeys } from "shared/consts/tanstack-keys"
import { db, getUser } from "shared/firebase"
import { IMessage, IPendingMessage } from "shared/libs/types"

export async function sendMessage(msg: IPendingMessage) {
	const uid = getUser()?.uid
	if(!uid) throw new Error('uid is null')

	const msgRef = await addDoc(collection(db, "messages"), msg)
	return (await getDoc(msgRef)).data() as IMessage
}
export function useCreateMessage(chatID: string) {
	const queryClient = useQueryClient()
	return useMutation<
		IMessage | undefined, //returns
		unknown, // error
		{ msg: IPendingMessage } // mutate vars
	>({
		mutationFn: ({ msg }) => sendMessage(msg),
		mutationKey: tanstackKeys.MESSAGES.SEND(chatID),

		// effects
		onSuccess(data, variables, context) {
			// queryClient.invalidateQueries(tanstackKeys.MESSAGES.GET(chatID))
		},
	})
}
