import { useState } from 'react'
import { FormData, StepProps, useMultistepForm } from './lib'
import { QuickSignup } from './ui/QuickSignup'

export const useSignupFormSteps = () => {
	const [fields, setFields] = useState<FormData>({
		email: '',
		pwd: '',
		name: '',
		about: '',
		photoBase64: '',
		photoURL: '',
		_fastSignup: false,
		_errors: []
	})

	function updateFields(fields: Partial<FormData>) {
		setFields(prev => {
			return { ...prev, ...fields }
		})
	}

	const steps: React.ReactElement<StepProps>[] = [
		QuickSignup,

	].map(Comp => <Comp updateFields={updateFields} {...fields} />)

	const useSteps = useMultistepForm(steps)

	return { ...useSteps, fields }
}