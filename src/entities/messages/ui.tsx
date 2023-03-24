import { Box, ListItem, ListItemText } from "@mui/material"
import { FC } from "react"
import { formatDate } from "shared/libs/formatDate"
import { IMessage } from "shared/types"

interface MessageProps {
	message: IMessage
	onContextMenu: React.MouseEventHandler<HTMLLIElement>
}
export const Message: FC<MessageProps> = ({ message, onContextMenu }) => {
	return (
		<ListItem
			onContextMenu={onContextMenu}
			sx={{ border: '1px solid black', borderRadius: '7px', padding: '4px' }}
		>
			<ListItemText
				primary={`
				${message.text}
				${formatDate(message.timestamp.seconds)}
				`}
			/>


		</ListItem>
	)
}