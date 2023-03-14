import { ChatBriefing } from "shared/types";

export function isGroupChat(chat: ChatBriefing): boolean {
	return (
		chat.type === 'group'
		&&
		!!chat.group
	)
}
export function isDirectChat(chat: ChatBriefing): boolean {
	return (
		chat.type === 'direct'
		&&
		!chat.group
		&&
		chat.users.length <= 2
	)
}