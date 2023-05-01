import { Routing } from 'pages/Routing';
import { composeHOCs } from 'shared/providers/composeHOCS';
import { withQueryClient } from 'shared/providers/withQueryClient';
import { withTheme } from './withTheme';
import { withRouter } from './withRouter';

const withProviders = composeHOCs(withRouter, withQueryClient, withTheme)

export const App = withProviders(() => {
	return (
		<Routing />
	)
})