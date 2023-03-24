import { Box } from "@mui/material"
import { chatModel } from "entities/chat"
import { ChatBar } from "entities/chat/ui/ChatBar"
import { useNavigate } from "react-router"
import { getUser } from "shared/firebase"
import { useUser } from "shared/libs/hooks/useUser"

export const ChatList = () => {

	const chatList = chatModel.useChatList()
	const history = useNavigate()

	const hancleClick: React.MouseEventHandler<HTMLLIElement> = (e) => {
	}

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