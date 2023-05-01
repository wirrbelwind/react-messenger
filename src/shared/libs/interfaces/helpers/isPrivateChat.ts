import { IBaseChat, IPrivateChat } from "../chats";

export function isPrivateChat(chat: IBaseChat): chat is IPrivateChat {
	return chat.type === 'direct'
}