interface NameOfUserOrChatProps {
	first_name?: string
	last_name?: string
	nickname?: string

	group_name?: string
}
export default function NameOfUserOrChat(names: NameOfUserOrChatProps | undefined) {
	console.log(names);
	
	if(!names) return ''
	if(names.first_name) {
		if(names.last_name) return names.first_name + ' ' + names.last_name
		else return names.first_name
	}
	if(names.nickname) return names.nickname
	if(names.group_name) return names.group_name
}