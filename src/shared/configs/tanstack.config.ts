export default {
	USER: {
		CREATE: ['user', 'create'],
		SIGNIN: ['user', 'signin'],
		SIGN_OUT: ['user', 'signout'],
	},
	CHATLIST: {
		GET_LIST: ['chatlist', 'get']
	},
	ACTUAL_CHAT: {
		GET: (chatID: string) => ['actualChat', 'get', chatID]
	},
	MESSAGES: {
		GET: (chatID: string) => ['messages', 'get', chatID],
		SEND: (chatID: string) => ['messages', 'send', chatID]
	},
	CHAT: {
		GET: (chatID: string) => ['chat', 'get', chatID]
	}
} as const