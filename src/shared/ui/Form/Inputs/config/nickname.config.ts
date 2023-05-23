import { RegisterOptions } from "react-hook-form"
import { IRegFormTemplate } from "../../../../../features/reg-form/model"

const rules: Omit<RegisterOptions<IRegFormTemplate, "name">, "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"> | undefined = {
	required: true,
	minLength: 3,
	maxLength: 30
}

const config = {
	rules,
	label: 'Nickname'
}

export default config;