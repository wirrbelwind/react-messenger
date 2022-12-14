import { FC } from "react"
import { IUseInput } from "../../../Hooks/useInput"
interface signInLayoutProps {
	loginState: IUseInput
	passwordState: IUseInput
}
const signInLayout: FC<React.InputHTMLAttributes<HTMLInputElement> & signInLayoutProps> = ({ loginState, passwordState, ...rest }) => {
	return (
		<>
			<input
				type="text" placeholder='Login' value={loginState.value} onChange={loginState.onChange}
				{...rest}
			/>
			<input
				type="text" placeholder='Password' value={passwordState.value} onChange={passwordState.onChange}
				{...rest}
			/>
		</>
	);
};

export default signInLayout;