import { Box } from "@mui/material"
import { EmojiPicker } from "features/emoji-picker";
import { MsgInput } from "features/send-msg";
import { doc, Timestamp } from "firebase/firestore";
import { FC } from "react";
import { db, getUser } from "shared/firebase";
import useInput from "shared/libs/hooks/useInput";
import { IPendingMessage } from "shared/libs/types";
import { ArrowButton } from "shared/ui/ArrowButton";

interface Props {
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

	const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		const uid = getUser()?.uid
		if (!input.value || !uid) return;

		// sendMessage(chatID, input.value)
		const newMsg: IPendingMessage = {
			chatID: doc(db, 'chats', chatID),
			senderID: doc(db, 'users', uid),
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

			{withSubmitBtn && <ArrowButton
				direction='right'
				type='submit'
				disabled={!input.value}
			/>}
		</Box>

	)
}