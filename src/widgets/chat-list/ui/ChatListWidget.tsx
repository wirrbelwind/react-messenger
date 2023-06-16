import { Box } from "@mui/material"
import { chatModel } from "entities/chat"
import { ChatTileWidget } from "widgets/chat-tile/ui"
import { NoChatsAlert } from "./NoChatsAlert"

interface ChatListWidgetProps {
	userID: string
}

export const ChatListWidget = (props: ChatListWidgetProps) => {
	const { userID } = props
	const IDs = chatModel.useChatIDs(userID)
	console.log(IDs);
	return (<Box sx={{
		// display: 'flex',
		// flexDirection: 'column',
		// border: '3px solid purple',

	}}>
		{IDs.data && IDs.data.length > 0 &&
			IDs.data.map(id => <ChatTileWidget chatID={id} userID={userID} key={id} />)
		}
		{IDs.data?.length === 0 && <NoChatsAlert />}
		{IDs.loading && <div>loadind</div>}
		{IDs.error && <div>{IDs.error.toString()}</div>}
	</Box>)
}