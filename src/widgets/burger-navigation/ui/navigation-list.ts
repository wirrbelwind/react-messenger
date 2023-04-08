import { SvgIconComponent } from "@mui/icons-material"
import SettingsIcon from '@mui/icons-material/Settings';
import routeConfig from "shared/consts/routeConfig";

interface Navigation {
	to: string
	icon: SvgIconComponent
	label: string
}

export const navs: Navigation[] = [
	{ label: 'Settings', icon: SettingsIcon, to: `/${routeConfig.private.SETTINGS}` },

]