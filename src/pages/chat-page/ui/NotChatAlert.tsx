import {  Box,  Typography } from "@mui/material";
import { LogoIcon } from "shared/ui/LogoIcon";

export function NotChatAlert() {
	return (
		<Box alignSelf='center' margin='auto' justifySelf='center' >
			<Typography>Select chat to start conversation <LogoIcon width={70} /></Typography>
		</Box>
	)
}