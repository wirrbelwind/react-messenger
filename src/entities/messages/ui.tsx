import { Box, ListItem, ListItemText, ListItemIcon } from "@mui/material"
import { FC } from "react"
import { formatDate } from "shared/libs/formatDate"
import { IMessage, IPendingMessage } from "shared/libs/types"
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

interface MessageProps {
	message: IMessage | IPendingMessage
	onContextMenu?: React.MouseEventHandler<HTMLLIElement>
	isPending?: boolean
}
export const Message: FC<MessageProps> = ({ message, onContextMenu, isPending = false }) => {
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
			{isPending && <ListItemIcon><AccessTimeFilledIcon /></ListItemIcon>}
		</ListItem>
	)
}