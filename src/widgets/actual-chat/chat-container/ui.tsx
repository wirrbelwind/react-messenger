import { Box } from "@mui/material"
import { useParams } from "react-router"
import { CreateMessage } from "../create-message"
import { ChatHeader } from "../header"
import { ChatMessages } from "../messages"
import { sendMsgModel } from "features/send-message"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "shared/firebase"

export const Chat = () => {
	const { chatID } = useParams<'chatID'>()

	const msgProc = sendMsgModel.useMsgSendingQueue(chatID)

	
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
			{!chatID &&
				<h1>nothing</h1>
			}

			{
				chatID && msgProc && <>
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