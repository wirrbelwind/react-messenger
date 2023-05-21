import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import HowToRegIcon from '@mui/icons-material/HowToReg';

interface SubmitButtonProps extends LoadingButtonProps {
	children: string
	loading?: boolean
	disabled?: boolean
}

export const SubmitButton = (props: SubmitButtonProps) => {
	const { children, ...restProps } = props

	return (
		<LoadingButton
			type='submit'
			fullWidth
			variant='contained'
			loadingPosition="end"
			endIcon={<HowToRegIcon />}
			loadingIndicator='Loading...'

			{...restProps}
		>
			{children}
		</LoadingButton>
	)
}