import { Alert } from "@mui/material";
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';

export function NotChatAlert() {
	return (
		<Alert icon={<EnergySavingsLeafIcon />}>Select chat to start conversation. </Alert>
	)
}