import { Box, BoxProps, IconButton } from "@mui/material"
import { EmojiPicker } from "features/emoji-picker";
import { MsgInput } from "features/send-message";
import { doc, Timestamp } from "firebase/firestore";
import { FC } from "react";
import useInput from "shared/libs/hooks/useInput";
import SendIcon from '@mui/icons-material/Send';
import firebase from "shared/api";
import { useUser } from "shared/libs/hooks/useUser";
import { IPendingMessage } from "shared/libs/interfaces/messages";

interface Props extends BoxProps {
	chatID: string
	sendMsg: (newMsg: IPendingMessage) => void
	withSubmitBtn?: boolean
}

export const CreateMessage: FC<Props> = ({
	chatID,
	sendMsg,
	withSubmitBtn = true
}) => {
	const input = useInput<string>('')
	const {user} = useUser()

	const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		const uid = user?.uid
		if (!input.value || !uid) return;

		// sendMessage(chatID, input.value)
		const newMsg: IPendingMessage = {
			chatID: doc(firebase.dbModule, 'chats', chatID),
			senderID: doc(firebase.dbModule, 'users', uid),
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

			<EmojiPicker input={input} />

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