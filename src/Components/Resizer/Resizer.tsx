import React, { useEffect } from 'react';
import { resizer } from '../../resizer';

const Resizer = () => {
	useEffect(() => resizer())
	return (
		<div className="resizer" id="dragMe"></div>
	);
};

export default Resizer;