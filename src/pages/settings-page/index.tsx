import { Grid } from '@mui/material';
import { useChatID } from 'shared/providers/ChatContext';
import { Sidebar } from 'widgets/sidebar';


export const SettingsPage = () => {
	return (
		<Grid container>
			<Grid
				item
				xs={4}
				component={Sidebar}
				withNavigation={true}
			/>
			<Grid item xs={10}>settings</Grid>
		</Grid>
	);
}