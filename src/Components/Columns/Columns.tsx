import React, { FC } from 'react';
import classes from './Columns.module.scss'

interface ColumnsProps {
	cols: React.ReactNode[]
}
const Columns: FC<ColumnsProps> = ({ cols }) => {
	return (
		<div className={classes.container}>
			{...cols}
		</div>
	);
};

export default Columns;