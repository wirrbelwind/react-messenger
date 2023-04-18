import { TextField } from "@mui/material"
import { FC } from "react"
import { UseInputReturnType } from "shared/libs/hooks/useInput"

interface MsgInputProps {
	input: UseInputReturnType<string>
}

export const MsgInput:FC<MsgInputProps> = ({input}) => {
	return (
		<TextField value={input.value} onChange={input.onChange}/>
	)
}