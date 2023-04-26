import { Box } from "@mui/material"
import { ChatBar } from "entities/chat-list/ui/ChatBar"
import { getUser } from "shared/api/firebase"
import { chatListModel } from "entities/chat-list"
import { useUser } from "shared/libs/hooks/useUser"

export const ChatList = () => {
	const { user } = useUser()
	console.log('user: ', user);

	const chatList = chatListModel.useChatList(user?.uid)

	return (
		<Box>
			{chatList.isSuccess &&
				chatList.data.map(chat =>
					<ChatBar
						key={chat.id}
						chat={chat}
						viewerID={getUser()?.uid}
					/>
				)
			}
			{chatList.isError &&
				<h1>Error</h1>
			}
			{chatList.isLoading &&
				<h1>Loading</h1>
			}
		</Box>
	)
}