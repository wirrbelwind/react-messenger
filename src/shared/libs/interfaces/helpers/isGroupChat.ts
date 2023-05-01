import { IBaseChat, IGroupChat } from "../chats";

export function isGroupChat(chat: IBaseChat): chat is IGroupChat {
	return chat.type === 'group'
}