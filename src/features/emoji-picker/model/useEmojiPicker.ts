import {useState} from 'react'
import { randArrElement } from 'shared/libs/utils/randArrElement'

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