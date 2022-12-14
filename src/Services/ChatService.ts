import $api from "../Helpers/api/api";
import { IDMChat, IGroupChat } from "../Interfaces/IChat";
import { IMessage } from "../Interfaces/IMessage";
import { IUser } from "../Interfaces/IUser";

export default class ChatService {
    static getChatByID(chatID: number) {
        return $api.get<IDMChat | IGroupChat>('/getChat', { params: { chatID } })
    }
    static getMessagesFromChat(chatID: number) {
        return $api.get<IMessage[]>('/messages', { params: { chatID } })
    }
    static getPartyFromChat(chatID: number) {
        return $api.get<IUser[]>('/party', { params: { chatID } })
    }
    static getChatListByUserID(userID: number) {
        return $api.get
            <Array<(IDMChat | IGroupChat)>>
            ('chatlist', { params: { userID } })
    }
    static sendMessage() {
        
    }
}