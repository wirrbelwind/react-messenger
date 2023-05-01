import { ListItem, ListItemText, ListItemIcon } from "@mui/material"
import { formatDate } from "shared/libs/utils/formatDate"
import { IMessage, IPendingMessage } from "shared/libs/interfaces"
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

interface MessageProps {
	message: IMessage | IPendingMessage
	onContextMenu?: React.MouseEventHandler<HTMLLIElement>
	isPending?: boolean
}
export const Message = ({
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
				primary={`
				${message.text}
				${formatDate(message.timestamp.seconds)}
				`}
			/>
			{isPending && <ListItemIcon><AccessTimeFilledIcon /></ListItemIcon>}
		</ListItem>
	)
}