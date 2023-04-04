import { useState } from 'react'
import { FormData, StepProps, useMultistepForm } from './lib'
import { AboutStep } from './ui/AboutStep'
import { QuickSignupStep } from './ui/QuickSignupStep'

export const useSignupFormSteps = () => {
	const [fields, setFields] = useState<FormData>({
		email: '',
		pwd: '',
		name: '',
		about: '',
		photoBase64: '',
		photoURL: '',
		_fastSignup: false,
	})

	function updateFields(fields: Partial<FormData>) {
		setFields(prev => {
			return { ...prev, ...fields }
		})
	}

	const steps: React.ReactElement<StepProps>[] = [
		QuickSignupStep,
		AboutStep

	].map(Comp => <Comp updateFields={updateFields} {...fields} />)

	const useSteps = useMultistepForm(steps)

	return { ...useSteps, fields, updateFields }
}