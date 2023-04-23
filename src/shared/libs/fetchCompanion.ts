import { getDoc } from "firebase/firestore"
import { ICompanion, RawChat } from "shared/libs/types"

export async function fetchCompanion(chat: RawChat, viewerUID: string): Promise<ICompanion> {
	const companionRef = chat.usersID.find(c => c.id !== viewerUID)

	if (!companionRef) throw new Error('companion not found')

	const companionSnap = await getDoc(companionRef)

	const companion: ICompanion = {
		...companionSnap.data() as ICompanion,
		companionID: companionSnap.id
	}
	return companion
}