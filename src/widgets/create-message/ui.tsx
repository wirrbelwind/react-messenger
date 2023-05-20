import { Box, BoxProps, IconButton } from "@mui/material"
import { MsgInput } from "features/send-message";
import useInput from "shared/libs/hooks/useInput";
import SendIcon from '@mui/icons-material/Send';
import { IPendingMessage } from "shared/libs/interfaces/messages";
import { userModel } from "entities/user";
import { EmojiPickerFeature } from "features/emoji-picker";
import { onSubmit } from "./model/onSubmit";
import styled from "@emotion/styled";

interface CreateMessageWidgetProps extends BoxProps {
	chatID: string
	sendMsg: (newMsg: IPendingMessage) => void
	withSubmitBtn?: boolean
}

const Container = styled(Box)({
	borderTop: 1,
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'stretch',
})

export const CreateMessageWidget = (props: CreateMessageWidgetProps) => {
	const { chatID, sendMsg, withSubmitBtn } = props

	const input = useInput<string>('')
	const { user } = userModel.useUser()

	const handleSubmit: React.FormEventHandler<HTMLDivElement> = (e) => {
		e.preventDefault()
		onSubmit(user, input, sendMsg, chatID)
	}

	return (
		<Container onSubmit={handleSubmit}>

			<EmojiPickerFeature onSelect={(emoji) => { input.setValue(prev => prev + emoji.native) }} />
			
			<MsgInput msgText={input.value} onChange={input.onChange} />

			{withSubmitBtn &&
				<IconButton type='submit' disabled={!input.value}>
					<SendIcon />
				</IconButton>
			}
		</Container>
	)
}
