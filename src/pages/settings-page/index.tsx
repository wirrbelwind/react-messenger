import { Grid } from '@mui/material';
import { useChatID } from 'shared/providers/ChatContext';
import { SidebarWidget } from 'widgets/sidebar';


export const SettingsPage = () => {
	return (
		<Grid container>
			<Grid
				item
				xs={4}
				component={SidebarWidget}
				withNavigation={true}
			/>
			<Grid item xs={10}>settings</Grid>
		</Grid>
	);
}