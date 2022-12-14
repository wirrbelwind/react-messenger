import React, { FC } from 'react';
interface ButtonViewProps {

}
const ButtonView: FC<ButtonViewProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...rest }) => {
	return (
		<button {...rest}>
			{children}
		</button>
	);
};

export default ButtonView;