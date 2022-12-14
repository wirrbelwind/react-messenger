import React, { FC } from 'react';
interface AvatarViewProps {
	url?: string
	title?: string
}
const AvatarView: FC<AvatarViewProps> = ({ url, title }) => {
	return (
		<div>
			{
				url &&
				<img src={url} alt="" />
			}
			{
				!url && title &&
				title[0]
			}
		</div>
	);
};

export default AvatarView;