import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import HowToRegIcon from '@mui/icons-material/HowToReg';

// interface SubmitBtnProps extends LoadingButtonProps {

// }

// NOTE: switch props to SubmitBtnProps interface after adding new props 
const SubmitBtn = (props: LoadingButtonProps) => {
	const { children, ...restProps } = props

	return (
		<LoadingButton
			fullWidth
			variant='contained'
			loadingPosition="end"
			endIcon={<HowToRegIcon />}
			loadingIndicator='Loading...'
			{...restProps}
		>
			{children}
		</LoadingButton>
	);
};

export default SubmitBtn;