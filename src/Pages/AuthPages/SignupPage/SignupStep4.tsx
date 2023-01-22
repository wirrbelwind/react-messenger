import { TextField } from '@mui/material';
import React from 'react';
type step4Data = {
	about: string
}

type step4Props = step4Data & {
	updateFields: (fields: Partial<step4Data>) => void
}
const SignupStep4 = ({ about, updateFields }: step4Props) => {
	return (
		<div>
			<TextField value={about} onChange={e => updateFields({ about: e.target.value })} />
		</div>
	);
};

export default SignupStep4;