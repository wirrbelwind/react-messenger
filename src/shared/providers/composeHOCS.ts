export type HOC = (Component: React.ComponentType) => React.ComponentType;

// Define the composeHOCs function
export const composeHOCs = (...hocs: HOC[]) => (Component: React.ComponentType) => {
	return hocs.reduceRight((wrappedComponent, hoc) => {
		return hoc(wrappedComponent);
	}, Component);
}