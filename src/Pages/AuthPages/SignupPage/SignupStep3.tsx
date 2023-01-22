import { Avatar, Box, Button } from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import { Crop } from 'react-image-crop';
import 'react-image-crop/src/ReactCrop.scss';
import ReactCrop from 'react-image-crop';

import { PixelCrop } from 'react-image-crop'

type step3Data = {
	avatar?: File
}
type step3Props = step3Data & {
	updateFields: (fields: Partial<step3Data>) => void
}

const SignupStep3 = ({ updateFields, avatar }: step3Props) => {
	const [cropProps, setCropProps] = useState<Crop>()
	const ref = useRef(null)

	return (
		<Box sx={{ width: '100%' }}>
			<ReactCrop
				ref={ref}
				crop={cropProps}
				onChange={c => setCropProps(c)}
				// onComplete={}
				aspect={1}
				keepSelection={true}
				minHeight={250}
				minWidth={250}
			>
				<img src={URL.createObjectURL(avatar)} />
			</ReactCrop>
		</Box>
	)
}


export default SignupStep3;