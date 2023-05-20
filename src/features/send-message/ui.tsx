import { TextField } from "@mui/material"
import React, { FC } from "react"

interface MsgInputProps {
	// input: UseInputReturnType<string>
	msgText: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const MsgInput:FC<MsgInputProps> = (props) => {
	const {msgText, onChange} = props

	return (
		<TextField value={msgText} onChange={onChange} fullWidth/>
	)
}