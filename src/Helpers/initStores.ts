import { Context, createContext } from "react";
import { Controller } from "../Controller/Controller";
import { ActualMessageStore } from "../Stores/ActualMessageStore";
import { AppStore } from "../Stores/AppStore";
import { ChatListStore } from "../Stores/ChatListStore";
import { ChatStore } from "../Stores/ChatStore";
import { SearchStore } from "../Stores/SearchStore";
import { UserStore } from "../Stores/UserStore";

export const ControllerContext = createContext<Controller | null>(null) as Context<Controller>;

export function initStores() {
	return {
		appStore: new AppStore(),
		userStore: new UserStore(),
		chatStore: new ChatStore(),
		chatListStore: new ChatListStore(),
		searchStore: new SearchStore(),
		actualMessageStore: new ActualMessageStore(),
	}
}