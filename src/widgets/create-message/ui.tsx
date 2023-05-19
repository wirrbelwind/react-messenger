import { Box, BoxProps, IconButton } from "@mui/material"
import { MsgInput } from "features/send-message";
import { doc, Timestamp } from "firebase/firestore";
import { FC } from "react";
import useInput from "shared/libs/hooks/useInput";
import SendIcon from '@mui/icons-material/Send';
import firebase from "shared/api";
import { IPendingMessage } from "shared/libs/interfaces/messages";
import { userModel } from "entities/user";
import { EmojiPickerFeature } from "features/emoji-picker";
import { IBaseChat } from "shared/libs/interfaces/chats";

interface Props extends BoxProps {
	chatID: string
	sendMsg: (newMsg: IPendingMessage) => void
	withSubmitBtn?: boolean
}

export const CreateMessageWidget: FC<Props> = ({
	chatID,
	sendMsg,
	withSubmitBtn = true
}) => {
	const input = useInput<string>('')
	const { user } = userModel.useUser()

	const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		const uid = user?.uid
		if (!input.value || !uid) return;

		// sendMessage(chatID, input.value)
		const newMsg: IPendingMessage = {
			chat: firebase.firestoreAPI.getDocRef<IBaseChat>('chat_base', chatID),
			sender: doc(firebase.dbModule, 'users', uid),
			status: 'unread',
			text: input.value,
			timestamp: Timestamp.now()
		}

		sendMsg(newMsg)

		input.setValue('')
	}
	return (
		<Box
			component='form'
			onSubmit={onSubmit}
			sx={{
				borderTop: 1,
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'stretch'
			}}>

			<EmojiPickerFeature input={input} />
			<MsgInput input={input} />

			{
				withSubmitBtn &&
				<IconButton type='submit' disabled={!input.value}>
					<SendIcon />
				</IconButton>
			}
		</Box>
	)
}