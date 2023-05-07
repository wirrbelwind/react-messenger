import { chatModel } from "entities/chat";
import { ChatBar } from "entities/chat-list/ui/ChatBar";
import { useUser } from "shared/libs/hooks/useUser";

interface ChatTileProps {
	id: string
}

export const ChatTile = (props: ChatTileProps) => {
	const { id } = props
	const { user } = useUser()

	const chat = chatModel.useChat(id, user?.uid)

	return (<>
		{
			chat?.chat && <ChatBar chat={chat.chat}/>
		}
	</>)
}