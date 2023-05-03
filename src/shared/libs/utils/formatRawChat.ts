import { IChat, IGroupChat, IPrivateChat, IBaseChat } from "shared/libs/interfaces/chats";

export function convertToTypedChat(chat: IBaseChat): IChat | null {
	switch (chat.type) {
		case "direct":
			if (chat.companion) {
				return {
					id: chat.id,
					type: 'direct',
					...chat.companion
				} as IPrivateChat
			}
			break;

		case 'group':
			if (chat.group) return {
				id: chat.id,
				usersID: chat.usersID,
				type: 'group',
				...chat.group,

			} as IGroupChat
			break;

		default:
			console.log('Error while handling chat with type ' + chat.type + ' at formatChat function')
			break;
	}
	return null
}
