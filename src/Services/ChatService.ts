import $api from "../Helpers/api/api";
import { IGetCurrentDate } from "../Helpers/getCurrentDate";
import { IPendingAttachment } from "../Models/IAttachment";
import { IDMChat, IGroupChat } from "../Models/IChat";
import { IMessage } from "../Models/IMessage";
import { IUser } from "../Models/IUser";

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
    static sendMessage(text: string, attachments: IPendingAttachment[]) {
        // const currentDate = getCurrentDate()
        // const chatID = this.chatStore.getChat.id
        // const userID = this.userStore.getUser.id

        // return $api.post('sendMessage', { params: { currentDate, text, chatID, userID } })
    }
}