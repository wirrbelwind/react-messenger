import { composeHOCs } from "./composeHOCS";
import { withQueryClient } from "./withQueryClient";
import { withRouter } from "./withRouter";
import { withTheme } from "./withTheme";

export const withProviders = composeHOCs(withRouter, withQueryClient, withTheme)