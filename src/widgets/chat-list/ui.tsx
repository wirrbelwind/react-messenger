import { Box } from "@mui/material"
import { chatListModel } from "entities/chat-list"
import { ChatBar } from "entities/chat-list/ui/ChatBar"
import { useUser } from "shared/libs/hooks/useUser"
import { ChatTile } from "widgets/chat-tile/ui"

interface ChatListProps {
	userID: string
}

export const ChatList = (props: ChatListProps) => {

	const { userID } = props

	const IDs = chatListModel.useIDs(userID)
	console.log(IDs);
	
	return (
		<Box>
			{
				IDs.data?.map(id => <ChatTile id={id} key={id} />)
			}
			{/* {chatList.isSuccess &&
				chatList.data.map(chat =>
					<ChatBar
						key={chat.id}
						chat={chat}
						viewerID={user?.uid}
					/>
				)
			}
			{chatList.isError &&
				<h1>Error</h1>
			}
			{chatList.isLoading &&
				<h1>Loading</h1>
			} */}
		</Box>
	)
}