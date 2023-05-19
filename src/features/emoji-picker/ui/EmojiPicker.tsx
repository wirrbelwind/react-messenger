import { Button, Popover } from '@mui/material';
import React from 'react';
import emojiDataSet from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { UseInputReturnType } from 'shared/libs/hooks/useInput';
import { useEmojiPicker } from '../model/useEmojiPicker';

export interface IEmoji {
	native: string
}

interface EmojiPickerFeatureProps {
	input: UseInputReturnType<string>
}

export const EmojiPickerFeature = (props: EmojiPickerFeatureProps) => {
	const {input} = props

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