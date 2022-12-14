import React, { FC } from 'react';
import classes from './Modal.module.scss';

interface ModalProps {
	children: React.ReactNode;
}

const Modal: FC<ModalProps> = (props: ModalProps) => {
	return (
		<div className={classes.modal}>
			{props.children}
		</div>
	);
};

export default Modal;