import { composeHOCs } from "./composeHOCS";
import { withQueryClient } from "./withQueryClient";
import { withRouter } from "./withRouter";

export const withProviders = composeHOCs(withRouter, withQueryClient)