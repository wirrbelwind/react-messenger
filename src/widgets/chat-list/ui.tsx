import { ChatBar, chatListModel } from "entities/chat-list"
import { useNavigate } from "react-router"
import { getUser } from "shared/firebase"
import { useUser } from "shared/libs/hooks/useUser"

export const ChatList = () => {
	const [user, loading, error] = useUser()

	const chatList = chatListModel.useList(user?.uid)
	const history = useNavigate()

	const hancleClick: React.MouseEventHandler<HTMLLIElement> = (e) => {
	}

	if (chatList.isSuccess) return (
		chatList.data.map(chat =>
			<ChatBar
				key={chat.id}
				chat={chat}
				viewerID={getUser()?.uid}
				handleClick={hancleClick}
			/>
		)
	)

	if (chatList.isError) return (<h1>Error</h1>)
	if (chatList.isLoading) return (<h1>Loading</h1>)
}