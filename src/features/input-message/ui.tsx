import { TextField } from "@mui/material"
import { FC } from "react"
import { UseInputReturnType } from "shared/libs/hooks/useInput"

interface Props {
	input: UseInputReturnType<string>
}

export const InputMessage: FC<Props> = ({ input }) => {

	return (
		<TextField
			fullWidth
			value={input.value}
			onChange={input.onChange}
			placeholder={'Type a message...'}
		/>
	)
}