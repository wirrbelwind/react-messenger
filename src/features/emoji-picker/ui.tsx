import { Button, Popover } from '@mui/material';
import React, { useState, FC, useMemo } from 'react';
import emojiDataSet from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { UseInputReturnType } from 'shared/libs/hooks/useInput';
import { randArrElement } from 'shared/libs/utils/randArrElement';

interface EmojiPickerProps {
	input: UseInputReturnType<string>
}
// доделать хук
export function useEmojiPicker() {
	const [anchorEl, setAnchorEl] = useState<any>(null)

	function handleClick(event: React.MouseEvent<HTMLElement>) {
		setAnchorEl(event.currentTarget)
	}
	function handleClose() {
		setAnchorEl(null)
	}

	const isOpened = !!anchorEl
	const id = isOpened ? 'simple-popover' : undefined

	const labelsDataset = ['🤓', '🥳', '👻', '💀', '👋']
	const [label, setLabel] = useState(randArrElement(labelsDataset))
	const switchEmojiLabel = () => setLabel(randArrElement(labelsDataset))

	return {
		handleClick,
		handleClose,
		switchEmojiLabel,
		label,
		isOpened,
		anchorEl,
		id
	}
}

export const EmojiPicker: FC<EmojiPickerProps> = ({ input }) => {
	const { anchorEl, handleClick, handleClose, label, isOpened, switchEmojiLabel, id } = useEmojiPicker()

	return (
		<>
			<Button
				variant="contained"
				color="primary"
				onClick={handleClick}
				onMouseOver={switchEmojiLabel}
				sx={{ fontSize: '25px' }}
			>
				{label}
			</Button>

			<Popover
				id={id}
				open={isOpened}
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
					onEmojiSelect={(emoji) => input.setValue(text => text + emoji.native)}
				/>
			</Popover>
		</>
	)
}