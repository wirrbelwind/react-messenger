import { Grid } from '@mui/material';
import { Sidebar } from 'shared/ui/Sidebar';


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