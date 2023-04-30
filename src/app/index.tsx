import { Routing } from 'pages/Routing';
import { composeHOCs } from 'shared/providers/composeHOCS';
import { withQueryClient } from 'app/providers/withQueryClient';
import { withRouter } from './providers/withRouter';
import { withTheme } from './providers/withTheme';

const withProviders = composeHOCs(withRouter, withQueryClient, withTheme)

export const App = withProviders(() => {
	return (
		<Routing />
	)
})