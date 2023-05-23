import { LoadingButton as LoadingBtnMUI, LoadingButtonProps } from "@mui/lab";
import HowToRegIcon from '@mui/icons-material/HowToReg';

// interface SubmitButtonProps extends LoadingButtonProps {

// }

export const LoadingButton = (props: LoadingButtonProps) => {
	const { children, ...restProps } = props

	return (
		<LoadingBtnMUI
			fullWidth
			variant='contained'
			loadingPosition="end"
			endIcon={<HowToRegIcon />}
			loadingIndicator='Loading...'

			{...restProps}
		>
			{children}
		</LoadingBtnMUI>
	)
}