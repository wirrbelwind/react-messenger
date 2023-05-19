import { IChat } from "shared/libs/interfaces/chats"
import {Paper} from '@mui/material'

interface ProfileEntityProps {
	chat: IChat
}

export const ProfileInfoEntity = (props: ProfileEntityProps) => {
	const {chat} = props

	return (<Paper>
		{Object.values(chat).toString()}
	</Paper>)
}