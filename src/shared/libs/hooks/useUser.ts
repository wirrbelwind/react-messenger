import { useEffect, useState } from "react";
import { authModule } from "shared/firebase";

export const useUser = () => {
	const [user, setUser] = useState(authModule.currentUser);
	useEffect(() => {
		const unsubscribe = authModule.onAuthStateChanged((user) => {
			setUser(user);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return user
}