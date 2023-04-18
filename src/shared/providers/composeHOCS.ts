export type HOC<T> = (Component: React.ComponentType<T>) => React.ComponentType<T>;

// Define the composeHOCs function
export const composeHOCs = <T extends {}>(...hocs: HOC<T>[]) => (Component: React.ComponentType<T>) => {
	return hocs.reduceRight((wrappedComponent, hoc) => {
		return hoc(wrappedComponent);
	}, Component);
}