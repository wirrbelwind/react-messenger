import React, { FC } from 'react';
interface InputMessageViewProps {
	
}
const InputView: FC<InputMessageViewProps & React.InputHTMLAttributes<HTMLInputElement>> = (...rest) => {
	return (
		<input
			type="text" {...rest}
		/>
	);
};

export default InputView;