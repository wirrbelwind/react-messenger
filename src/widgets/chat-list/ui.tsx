import { Box } from "@mui/material"
import { chatModel } from "entities/chat"

import { ChatTileWidget } from "widgets/chat-tile/ui"

interface ChatListWidgetProps {
	userID: string
}

export const ChatListWidget = (props: ChatListWidgetProps) => {
	const { userID } = props
	const IDs = chatModel.useChatIDs(userID)
	console.log(IDs);


	return (<Box>
		{IDs.data && IDs.data.length > 0 &&
			IDs.data.map(id => <ChatTileWidget chatID={id} userID={userID} key={id} />)
		}
		{IDs.data && IDs.data.length === 0 &&
			<div>Нет чатов</div>
		}
		{IDs.loading && <div>loadind</div>}
		{IDs.error && <div>{IDs.error.toString()}</div>}
	</Box>)
}