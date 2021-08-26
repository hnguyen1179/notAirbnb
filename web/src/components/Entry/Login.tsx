import React from "react";
import useLogin from "../../hooks/useLogin";
import TextField from "@material-ui/core/TextField";
import FormError from "./FormError";

function Login({ form, showPassword, setShowPassword, resetForm }: any) {
	const [login, { loading: loginLoad }] = useLogin();

	const {
		setError,
		handleSubmit,
		register,
		formState: { errors },
	} = form;

	const onSubmitLogin = async (payload: any) => {
		try {
			const { email, passwordLogin } = payload;
			await login(email, passwordLogin);
			resetForm();
		} catch (e) {
			// TODO: Figure out how to send back invalid passwords into the password error field
			setError(
				"passwordLogin",
				{ type: "Invalid Password", message: e.message },
				{ shouldFocus: true }
			);
		}
	};

	return (
		<div className="MuiContainer">
			<h1>Log In</h1>
			<form onSubmit={handleSubmit(onSubmitLogin)} autoComplete="off">
				<div>
					{/* Login password input requires no validation except for server side validations (invalid password) */}
					<TextField
						error={errors.passwordLogin}
						helperText={
							<FormError error={errors.passwordLogin?.message} />
						}
						type={showPassword ? "text" : "password"}
						label="Password"
						placeholder="Password"
						variant="outlined"
						{...register("passwordLogin")}
					/>
					<button
						type="button"
						onClick={() => setShowPassword((prev: any) => !prev)}
					>
						{showPassword ? "hide" : "show"}
					</button>
				</div>
				<button type="submit" disabled={loginLoad}>
					Log In
				</button>
			</form>
		</div>
	);
}

export default Login;
