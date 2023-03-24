import { Box, Button, Grid, IconButton, Popover, TextField, Typography } from "@mui/material"
import { EmojiPicker } from "features/emoji-picker";
import { InputMessage } from "features/input-message/ui";
import { FC, useState } from "react";
import useInput from "shared/libs/hooks/useInput";
import { ArrowButton } from "shared/ui/ArrowButton";

interface Props {
	chatID: string
}

export const CreateMessage: FC<Props> = ({ chatID }) => {
	const input = useInput<string>('')

	const onSubmit = () => {
		if (input.value) { alert(input.value) }
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

			<ArrowButton direction='right' type='submit' />
		</Box>

	)
}