import { ListItem, ListItemText, ListItemIcon, Typography, Box, Button } from "@mui/material"
import { formatDate } from "shared/libs/utils/formatDate"
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { IMessage, IPendingMessage } from "shared/libs/interfaces/messages";

interface MessageProps {
	message: IMessage | IPendingMessage
	onContextMenu?: React.MouseEventHandler<HTMLLIElement>
	isPending?: boolean
	owned?: boolean
}
export const MessageEntity = ({
	message,
	onContextMenu,
	isPending = false,
	owned
}: MessageProps) => {
	const timestamp = formatDate(message.timestamp.toMillis())

	return (
		<Box
			component='button'
			onContextMenu={onContextMenu}
			sx={{
				background: owned ? 'rgba(87, 126, 170,0.5)' : 'rgba(0,0,0, 0.1)',
				borderRadius: '14px',
				borderWidth: 0,
				padding: '3px 6px',
				maxWidth: '50%',
				minWidth: '60px',
				overflowWrap: 'break-word'
				// display: 'flex',
				// flexBasis: '100px'
			}}
		>
			<ListItemText
				primary={
					<Typography textAlign='left' fontSize='17px' fontWeight='500'>{message.text}</Typography>
				}
				secondary={
					<Typography textAlign='right' fontSize='13px' fontWeight='500'>
						{timestamp}
					</Typography>
				}
			/>

			{isPending && <ListItemIcon><AccessTimeFilledIcon /></ListItemIcon>}
		</Box>
	)
}
