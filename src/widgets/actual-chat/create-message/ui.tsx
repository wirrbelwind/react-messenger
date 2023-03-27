import { Box, Button, Grid, IconButton, Popover, TextField, Typography } from "@mui/material"
import { messagesModel } from "entities/messages";
import { EmojiPicker } from "features/emoji-picker";
import { InputMessage } from "features/input-message/ui";
import { doc, Timestamp } from "firebase/firestore";
import { SetStateAction } from "react";
import { FC, useState } from "react";
import { db, getUser } from "shared/firebase";
import useInput from "shared/libs/hooks/useInput";
import { IPendingMessage } from "shared/libs/types";
import { ArrowButton } from "shared/ui/ArrowButton";

interface Props {
	chatID: string
	msgQueue?: [IPendingMessage[], React.Dispatch<React.SetStateAction<IPendingMessage[]>>]
	withSubmitBtn?: boolean
}

export const CreateMessage: FC<Props> = ({
	chatID,
	msgQueue,
	withSubmitBtn = true
}) => {
	const input = useInput<string>('')

	const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		const uid = getUser()?.uid
		if (!input.value || !msgQueue || !uid) return

		// sendMessage(chatID, input.value)

		msgQueue[1](prev => [...prev,
		{
			chatID: doc(db, 'chats', chatID),
			senderID: doc(db, 'users', uid),
			status: 'unread',
			text: input.value,
			timestamp: Timestamp.now()
		}])
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

			<InputMessage input={input} />

			{withSubmitBtn && <ArrowButton
				direction='right'
				type='submit'
				disabled={!input.value}
			/>}
		</Box>

	)
}