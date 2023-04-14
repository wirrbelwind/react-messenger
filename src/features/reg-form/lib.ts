import { AuthError, AuthErrorCodes, AuthErrorMap } from "firebase/auth"
import { ReactElement, useState } from "react"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router"
import { authModule } from "shared/api/firebase"

export interface FormData {
	name: string
	email: string
	pwd: string
	confirmPwd: string
	photoURL?: string
	photoBase64?: string
	
}
// export type StepProps = FormData & {
// 	updateFields: (fields: Partial<FormData>) => void
// }

// export function useMultistepForm(steps: ReactElement[]) {
// 	const [currentStepIndex, setCurrentStepIndex] = useState(0)

// 	function next() {
// 		setCurrentStepIndex(i => {
// 			if (i >= steps.length - 1) return i
// 			return i + 1
// 		})
// 	}

// 	function back() {
// 		setCurrentStepIndex(i => {
// 			if (i <= 0) return i
// 			return i - 1
// 		})
// 	}

// 	function goTo(index: number) {
// 		setCurrentStepIndex(index)
// 	}

// 	return {
// 		currentStepIndex,
// 		step: steps[currentStepIndex],
// 		steps,
// 		isFirstStep: currentStepIndex === 0,
// 		isLastStep: currentStepIndex === steps.length - 1,
// 		goTo,
// 		next,
// 		back,
// 	}
// }

// export function formatAuthError(error: AuthError) {
// 	AuthErrorCodes
// 	switch (error.code) {
// 		case AuthErrorCodes.EMAIL_EXISTS:
// 			return 'Email is already taken.'

// 		case AuthErrorCodes.INVALID_EMAIL:
// 			return 'Invalid email.'

// 		case AuthErrorCodes.WEAK_PASSWORD:
// 			return 'Password should contain at least 6 letters or digits.'

// 		case AuthErrorCodes.INVALID_PASSWORD:
// 			return 'Incorrect password.'

// 		default:
// 			return 'Unknown error. Try again later.'
// 	}
// }
// export type useHandleStepDirection = 'back' | 'next'