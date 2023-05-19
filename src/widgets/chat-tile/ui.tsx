import { chatModel } from "entities/chat";
import { ChatBarEntity } from "entities/chat/ui/ChatBar/ChatBar";
import { messagesModel } from "entities/messages";

interface ChatTileWidgetProps {
	chatID: string
	userID: string
}

export const ChatTileWidget = (props: ChatTileWidgetProps) => {
	const { chatID, userID } = props

	const chat = chatModel.useChat(chatID, userID)
	const lastMsg = messagesModel.useLastMsg(chatID)
	console.log(lastMsg);
	
	return (<>
		{
			chat?.chat && <ChatBarEntity chat={chat.chat} />
		}
	</>)
}
