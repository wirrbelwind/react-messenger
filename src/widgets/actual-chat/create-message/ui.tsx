import { Box, Button, Grid, IconButton, Popover, TextField, Typography } from "@mui/material"
import { messagesModel } from "entities/messages";
import { EmojiPicker } from "features/emoji-picker";
import { InputMessage } from "features/input-message/ui";
import { SetStateAction } from "react";
import { FC, useState } from "react";
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

	const sendMessage = messagesModel.useCreateMessage()

	const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		if (!input.value || !msgQueue) return

		// sendMessage(chatID, input.value)
		msgQueue[1](prev => [...prev, {}])
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