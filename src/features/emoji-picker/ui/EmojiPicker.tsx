import { Button, Popover } from '@mui/material';
import React from 'react';
import emojiDataSet from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useEmojiPicker } from '../model/useEmojiPicker';
import { IEmoji } from '../model';

interface EmojiPickerFeatureProps {
	// input: UseInputReturnType<string>
	onSelect: (emoji: IEmoji) => void
}
export const EmojiPickerFeature = (props: EmojiPickerFeatureProps) => {
	const { onSelect } = props
	const { anchorEl, handleClick, handleClose, label, isOpened, switchEmojiLabel, id } = useEmojiPicker()

	return (<>
		<Button variant="contained" color="primary" onClick={handleClick}
			onMouseOver={switchEmojiLabel} sx={{ fontSize: '25px' }}>{label}</Button>

		<Popover id={id} open={isOpened} anchorEl={anchorEl} onClose={handleClose}
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
		>
			<Picker data={emojiDataSet} onEmojiSelect={onSelect} />
		</Popover>
	</>)
}
