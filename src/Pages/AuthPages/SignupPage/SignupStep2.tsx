import { Avatar, Box, Button, IconButton, Modal, Tab, Tabs, TextField, Typography } from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Webcam from "react-webcam";
import useInput from '../../../Hooks/useInput';
import { TabPanel } from '../../../GeneralComponents/TabPanel/TabPanel';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { dataUrlToFile } from '../../../Helpers/dataURLtoFile';

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}
type step2Data = {
	avatar?: File
}

type step2Props = step2Data & {
	updateFields: (fields: Partial<step2Data>) => void
}

const SignupStep2 = ({ avatar, updateFields }: step2Props) => {
	// choose an image
	const inputImagehandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.currentTarget.files) return;

		updateFields({ avatar: e.currentTarget.files[0] })
	}

	// camera
	const webcamRef = React.useRef<Webcam>(null);
	const capture = React.useCallback(
		() => {
			const capturedImgURL = webcamRef.current?.getScreenshot();
			if (capturedImgURL)
				dataUrlToFile(capturedImgURL, 'avatar').then(res => updateFields({ avatar: res }))
		},
		[webcamRef]
	);

	const tabState = useInput(0)


	return (
		<>
			{/* title */}
			<Typography component='p' variant='body1'>Choose or make an avatar</Typography>

			{/* tabs between browsing image and camera */}
			<Tabs
				value={tabState.value}
				onChange={(e, value) => { tabState.setValue(value) }}
				aria-label="basic tabs example"
				variant="fullWidth">
				<Tab label="Choose photo" {...a11yProps(0)} />
				<Tab label="Take a picture" {...a11yProps(1)} />
			</Tabs>

			{/* tab panel contains input-file-btn */}
			<TabPanel value={Number(tabState.value)} index={0}>
				{/* Input file(img) button */}
				<IconButton
					color="primary"
					aria-label="upload picture"
					component="label"
					size='large'
				>
					<input
						hidden accept="image/*" type="file" onChange={inputImagehandleChange} />
					<PhotoCamera fontSize='large' />
					<Typography marginLeft={1} variant='body1'>Upload Image</Typography>
				</IconButton>
			</TabPanel>

			{/* tab panel contains camera */}
			<TabPanel value={Number(tabState.value)} index={1}>
				{/* displays webcam */}
				<Box>
					<Webcam
						screenshotQuality={1}
						forceScreenshotSourceSize
						audio={false}
						ref={webcamRef}
						screenshotFormat="image/jpeg"
					/>
				</Box>
				{/* button takes a picture */}
				<Button onClick={capture} variant='contained' fullWidth>Capture photo</Button>
			</TabPanel>
		</>
	);
};

export default SignupStep2;