import { IGroupChat } from "../Models/IChat";

export function isGroupChat(object: unknown): object is IGroupChat {
	return Object.prototype.hasOwnProperty.call(object, "id") &&
		Object.prototype.hasOwnProperty.call(object, "title") &&
		Object.prototype.hasOwnProperty.call(object, "about") &&
		Object.prototype.hasOwnProperty.call(object, "owner_id")
}