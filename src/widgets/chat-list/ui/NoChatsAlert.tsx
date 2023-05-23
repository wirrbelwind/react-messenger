import { Box, Typography } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

export const NoChatsAlert = () => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<Typography
				variant="body1"
				color='dark'
				textAlign='center'
				paddingTop={10}
				paddingBottom={1}
			>
				No chats yet
			</Typography>
			<SentimentVeryDissatisfiedIcon
				sx={{ fontSize: '100px', color: 'rgba(0,0,0,.5)' }}
			/>
		</Box>);
};

