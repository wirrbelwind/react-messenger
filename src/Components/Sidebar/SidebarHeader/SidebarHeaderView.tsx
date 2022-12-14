import React, { FC } from 'react';
import { sidebarContentType } from '../../../Stores/AppStore';
import BurgerButtonView from '../../BurgerButton/BurgerButtonView';
interface SidebarHeaderProps {
	title: sidebarContentType
	searchState: { value: string, setState: Function }
}
const SidebarHeaderView: FC<SidebarHeaderProps> = ({ title, searchState }) => {
	return (
		<div>
			<BurgerButtonView onClick={() => { }} />

			<p>{title}</p>

			<input
				type='text'
				value={searchState.value}
				onChange={(e) => { searchState.setState(e.currentTarget.value) }}
			/>
		</div>
	);
};

export default SidebarHeaderView;