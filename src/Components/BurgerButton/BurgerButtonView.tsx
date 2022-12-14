import React, { FC } from 'react';
import ButtonView from '../Button/ButtonView';
import classes from './BurgerButton.module.scss'

const BurgerButtonView: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children }, ...rest) => {
	return (
		<ButtonView
			className={classes.container}
			{...rest}
		>
			{
				children || <><div></div><div></div><div></div></>
			}

		</ButtonView>
	);
};

export default BurgerButtonView;