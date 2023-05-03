import { Routing } from 'pages/Routing';
import { composeHOCs } from 'shared/providers/composeHOCS';
import { withQueryClient } from 'shared/providers/withQueryClient';
import { withRouter } from 'shared/providers/withRouter';
import { withTheme } from 'shared/providers/withTheme';

const withProviders = composeHOCs(withRouter, withQueryClient, withTheme)

export const App = withProviders(() => {
	return (
		<Routing />
	)
})