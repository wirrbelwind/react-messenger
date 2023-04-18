export function wait(ms: number): Promise<null> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(null);
		}, ms);
	});
};