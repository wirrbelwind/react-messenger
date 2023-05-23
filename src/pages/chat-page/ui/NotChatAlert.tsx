import { Alert, Box } from "@mui/material";
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';

export function NotChatAlert() {
	return (
		<Box alignSelf='center' justifySelf='center'>
			<Alert icon={<EnergySavingsLeafIcon />}>Select chat to start conversation. </Alert>
		</Box>
	)
}