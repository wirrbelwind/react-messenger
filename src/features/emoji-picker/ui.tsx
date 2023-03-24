import { Button, makeStyles, Popover } from '@mui/material';
import React, { useState, useRef, useEffect, ChangeEvent, FC } from 'react';
import emojiDataSet from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { UseInputReturnType } from 'shared/libs/hooks/useInput';
import { randArrElement } from 'shared/libs/randArrElement';

interface EmojiPickerProps {
	input: UseInputReturnType<string>
}

export const EmojiPicker: FC<EmojiPickerProps> = ({ input }) => {
	const [anchorEl, setAnchorEl] = useState<any>(null)

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;


	const emojiLabels = ['🤓', '🥳', '👻', '💀', '👋']
	const [emojiLabel, setEmojiLabel] = useState(randArrElement(emojiLabels))
	const switchEmojiLabel = () => setEmojiLabel(randArrElement(emojiLabels))

	return (
		<>
			<Button
				variant="contained"
				color="primary"
				onClick={handleClick}
				onMouseOver={switchEmojiLabel}
				sx={{ fontSize: '25px' }}
			>
				{emojiLabel}
			</Button>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
			>
				<Picker
					data={emojiDataSet}
					onEmojiSelect={(emoji: string) => input.setValue(text => text + emoji.native)}
				/>
			</Popover>
		</>
	)
}