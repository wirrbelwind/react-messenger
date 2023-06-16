import { stringToAvatarStyles } from "shared/libs/utils/stringToAvatar";
import { AvatarProps } from '@mui/material/Avatar'
import { Avatar } from "@mui/material";

interface AvatarChatProps extends AvatarProps {
	name?: string
}

const AvatarChat = (props: AvatarChatProps) => {
	const { name, src, ...restProps } = props

	const avatar = !src && { ...stringToAvatarStyles(name || '?') }
	
	return (
		<Avatar
			{...avatar}
			{...restProps}
		/>
	);
};

export default AvatarChat;