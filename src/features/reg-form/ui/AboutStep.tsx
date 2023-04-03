import { TextField } from "@mui/material"
import { FC } from "react"
import { StepProps } from "../lib"

export const AboutStep: FC<StepProps> = ({ updateFields, about }) => {
	return (
		<>
			<TextField
				label='About you'
				value={about}
				onChange={e => updateFields({ about: e.currentTarget.value })}
			/>
		</>
	)
}