import { Box, Button, TextField } from "@mui/material"
import { userModel } from "entities/user"
import { useNavigate } from "react-router"
import useInput from "shared/libs/hooks/useInput"


export const LoginForm = () => {
	const navigate = useNavigate()
	const login = useInput<string>('')
	const pwd = useInput<string>('')

	const [signin, user, loading, error] = userModel.useSignin()
	const createUser = userModel.useCreateUser()

	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		signin(login.value, pwd.value)

	}
	if (user) navigate('/', { replace: true })

	return (
		<Box
			component={'form'}
			sx={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'white', padding: '20px', borderRadius: '5px' }}
			onSubmit={onSubmit}
		>

			<TextField
				value={login.value}
				onChange={login.onChange}
				fullWidth
				label='Login'
				autoFocus
			/>
			<TextField
				value={pwd.value}
				onChange={pwd.onChange}
				fullWidth
				label='Password'
			/>
			{createUser.isError && <h1>error</h1>}
			{createUser.isLoading && <h1>lodaing</h1>}
			{createUser.isSuccess && <h1>success</h1>}
			<Button type='submit' fullWidth variant='contained'>Sign In</Button>

		</Box>
	)
}