import { ListItem, ListItemText, ListItemIcon } from "@mui/material"
import { formatDate } from "shared/libs/utils/formatDate"
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { IMessage, IPendingMessage } from "shared/libs/interfaces/messages";

interface MessageProps {
	message: IMessage | IPendingMessage
	onContextMenu?: React.MouseEventHandler<HTMLLIElement>
	isPending?: boolean
}
export const MessageEntity = ({
	message,
	onContextMenu,
	isPending = false
}: MessageProps) => {
	return (
		<ListItem
			onContextMenu={onContextMenu}
			sx={{ border: '1px solid black', borderRadius: '7px', padding: '4px' }}

		>
			<ListItemText
				primary={message.text}
				secondary={formatDate(message.timestamp.toMillis())}
			/>
			{isPending && <ListItemIcon><AccessTimeFilledIcon /></ListItemIcon>}
		</ListItem>
	)
}