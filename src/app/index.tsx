import { Routing } from 'pages/Routing';
import { composeHOCs } from 'shared/providers/composeHOCS';
import { withRouter } from 'shared/providers/withRouter';
import { withQueryClient } from 'shared/providers/withQueryClient';
import { withTheme } from 'shared/providers/withTheme';

export const withProviders = composeHOCs(withRouter, withQueryClient, withTheme)

const App = () => {
	return (
		<Routing />
	)
}

export default withProviders(App)