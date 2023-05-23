import { RegisterOptions } from "react-hook-form"
import { IRegFormTemplate } from "../../../../../features/reg-form/model"

const rules: Omit<RegisterOptions<IRegFormTemplate, "email">, "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"> | undefined = {
	required: true,
	pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
}

const config = {
	rules,
	label: 'Email'
}

export default config;