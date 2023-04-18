import { useState } from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router'
import { authModule } from 'shared/api/firebase'
// import { FormData, StepProps, useMultistepForm } from './lib'
import { AboutStep } from './ui/AboutStep'
import { QuickSignupStep } from './ui/QuickSignupStep'

// export const useSignupFormSteps = () => {
// 	const [fields, setFields] = useState<FormData>({
// 		email: '',
// 		pwd: '',
// 		confirmPwd: '',
// 		name: '',
// 		about: '',
// 		photoBase64: '',
// 		photoURL: '',
// 		_fastSignup: false,
// 	})

// 	function updateFields(fields: Partial<FormData>) {
// 		setFields(prev => {
// 			return { ...prev, ...fields }
// 		})
// 	}

// 	const stepComponents: React.ReactElement<StepProps>[] = [
// 		QuickSignupStep,
// 		AboutStep

// 	].map(Comp => <Comp updateFields={updateFields} {...fields} />)

// 	const steps = useMultistepForm(stepComponents)

// 	const [
// 		createUserWithEmailAndPassword,
// 		user,
// 		loading,
// 		error,
// 	] = useCreateUserWithEmailAndPassword(authModule)
// 	const navigate = useNavigate()

// 	return {
// 		...steps,
// 		fields,
// 		updateFields,
// 		createUserWithEmailAndPassword,
// 		user,
// 		loading,
// 		authError: error,
// 		submitBtnTxt() {
// 			if (steps.isFirstStep) return 'Create'
// 			if (!steps.isFirstStep && !steps.isLastStep) return 'Next'
// 			if (steps.isLastStep) return 'Finish'

// 			return '>'
// 		},
// 		async handleStepTransition(direction: 'back' | 'next') {
// 			if (direction === 'back' && !steps.isFirstStep) steps.back()

// 			if (direction === 'next') {
// 				//if step is last, go to index page
// 				if (steps.isLastStep) return navigate('/', { replace: true })

// 				if (steps.isFirstStep) {
// 					await createUserWithEmailAndPassword(fields.email, fields.pwd)

// 					console.log(user)
// 					console.log(error)
// 					console.log('loading: ', loading)

// 					if (user) {
// 						if (fields._fastSignup) return navigate('/', { replace: true })
// 						else return steps.next()
// 					}
// 					else return;
// 				}

// 				console.log('last case')
// 				return steps.next()
// 			}
// 		},
// 		backIsPossible(): boolean {
// 			return steps.currentStepIndex > 1
// 		},
// 		nextIsPossible(): boolean {
// 			if (steps.currentStepIndex === 0) {
// 				if (fields.email && fields.pwd && fields.pwd === fields.confirmPwd) return true
// 				else return false
// 			}

// 			return true
// 		}
// 	}
// }