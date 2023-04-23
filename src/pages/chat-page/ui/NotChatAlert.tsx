import { Alert } from "@mui/material";
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';

export function NotChatAlert() {
	return (
		<Alert title="Select chat to start conversation." icon={<EnergySavingsLeafIcon />} />
	)
}