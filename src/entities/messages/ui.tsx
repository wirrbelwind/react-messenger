import { Box, ListItem, ListItemText } from "@mui/material"
import { FC } from "react"
import { IMessage } from "shared/types"

interface MessageProps {
	message: IMessage
	onContextMenu: React.MouseEventHandler<HTMLLIElement>
}
export const Message: FC<MessageProps> = ({ message, onContextMenu }) => {
	return (
		<ListItem onContextMenu={onContextMenu}>
			<ListItemText
				primary={`
				${message.id}
				${message.senderID}
				${message.status}
				${message.text}
				${message.timestamp.seconds}
				`}
			/>


		</ListItem>
	)
}