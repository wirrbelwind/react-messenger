import { Box, Button, TextField } from "@mui/material"
import { userModel } from "entities/user"
import useInput from "shared/libs/hooks/useInput"


export const LoginForm = () => {
	const login = useInput<string>('')
	const pwd = useInput<string>('')

	const signin = userModel.signin()
	const createUser = userModel.createUser()

	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()

		signin.mutate({ email: login.value, pwd: pwd.value })
		console.log('submit');
		
	}

	if (signin.isError) console.log('error', signin.error);
	if (signin.isLoading) console.log('lodaing');
	if (signin.isSuccess) console.log(signin.data);
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
			{createUser.isError && <h1>{createUser.error.message}</h1>}
			{createUser.isLoading && <h1>lodaing</h1>}
			{createUser.isSuccess && <h1>success</h1>}
			<Button type='submit' fullWidth variant='contained'>Sign In</Button>

		</Box>
	)
}