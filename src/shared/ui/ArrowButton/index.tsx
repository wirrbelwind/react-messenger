import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { IconButton, IconButtonProps } from '@mui/material';

interface Props extends IconButtonProps {
	direction: 'left' | 'right' | 'up' | 'down'
}
export const ArrowButton = ({ direction, children, ...props }: Props) => {

	return (
		<IconButton {...props}>
			{direction == 'left' && <NavigateBeforeIcon />}
			{direction == 'right' && <NavigateNextIcon />}
			{direction == 'up' && <ExpandMoreIcon />}
			{direction == 'up' && <ExpandLessIcon />}

			{children}
		</IconButton>
	)
}