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
	const { lastMsg, loading, error } = messagesModel.useLastMsg(chatID)
	return (<>
		{chat?.chat && <ChatBarEntity chat={chat.chat} lastMsg={lastMsg} />}</>)
}
