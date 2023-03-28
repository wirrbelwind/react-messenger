import { Box } from "@mui/material"
import { messagesModel } from "entities/messages"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { IMessage, IPendingMessage } from "shared/libs/types"
import { CreateMessage } from "../create-message"
import { ChatHeader } from "../header"
import { ChatMessages } from "../messages"
import { BehaviorSubject } from 'rxjs';

export const Chat = () => {
	const { chatID } = useParams<'chatID'>()

	if (!chatID) return (
		<h1>nothing</h1>
	)

	const msgProc = messagesModel.useMsgSendingQueue(chatID)

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
			{!chatID &&
				<h1>nothing</h1>
			}

			{
				chatID && <>
					<Box sx={{ flexGrow: 0, flexShrink: 1 }}>
						<ChatHeader chatID={chatID} />
					</Box>

					<Box sx={{ flexGrow: 1 }} >
						<ChatMessages
							chatID={chatID}
							msgQueueState={msgProc.state}
						/>
					</Box>

					<Box sx={{ flexGrow: 0, flexShrink: 1 }}>
						<CreateMessage
							chatID={chatID}
							sendMsg={msgProc.addMessage}
						/>
					</Box>
				</>
			}
		</Box>
	)
}