import { RegisterOptions } from "react-hook-form"
import { IRegFormTemplate } from "../../../../../features/reg-form/model"

const rules: Omit<RegisterOptions<IRegFormTemplate, "name">, "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"> | undefined = {
	required: true,
	minLength: 6,
	maxLength: 50
}

const config = {
	rules,
	label: 'Password'
}

export default config;