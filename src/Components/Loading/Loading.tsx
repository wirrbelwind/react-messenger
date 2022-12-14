import React, { FC } from 'react';
import classes from './Loading.module.scss';

const Loading: FC = () => {
	return (
		<div className={classes.container}>
			<div className={classes.loading}>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default Loading;