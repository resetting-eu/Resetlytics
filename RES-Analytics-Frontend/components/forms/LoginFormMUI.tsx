'use client';

import useLogin from '@hooks/use-login';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function LoginFormMUI() {
	const { username, password, isLoading, onChange, onSubmit } = useLogin();

	return (
		
		<Container  maxWidth="xs">
			<Box
				sx={{
					boxShadow: 3,
					borderRadius: 2,
					px: 4,
					py: 6,
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography component="h1" variant="h5" >
					Log in
				</Typography>
				<Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						key='username'
						id='username'
						type='username'
						label='Username'
						name='username'
						value={username}
						onChange={onChange}
						autoFocus
						sx={{
							"& .Mui-focused": {
								color: "#46b3c2",
							},

							"& .MuiOutlinedInput-root": {
								"&.Mui-focused fieldset": {
									borderColor: '#46b3c2'
								}
							}
						}}
					/>

					<TextField
						margin="normal"
						required
						fullWidth
						key='password'
						id='password'
						type='username'
						label='Password'
						name='password'
						value={password}
						onChange={onChange}
						autoFocus
						sx={{

							"& .MuiOutlinedInput-root": {
								"&.Mui-focused fieldset": {
									borderColor: '#46b3c2'
								}
							},
							"& .Mui-focused": {
								color: "#46b3c2",
							},

							
						}}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{
							textTransform: 'capitalize',
							mt: 3,
							mb: 2,
							backgroundColor: '#46b3c2',
							":hover": {
								backgroundColor: '#46b3c2'
							},

						}}
					>
						Log In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href='/password-reset' variant="body2" sx={{ color: '#46b3c2' }}>
								Forgot password?
							</Link>
						</Grid>

					</Grid>
				</Box>

			</Box>
		</Container>
	);
}