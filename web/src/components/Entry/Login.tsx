import React from "react";
import useLogin from "../../hooks/useLogin";
import TextField from "@material-ui/core/TextField";
import FormError from "./FormError";
import ShowPasswordButton from "./ShowPasswordButton";
import { ReactComponent as BackSvg } from "../../assets/svgs/back.svg";

function Login({ form, showPassword, clickShowPassword, resetForm }: any) {
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
			setError(
				"passwordLogin",
				{ type: "Invalid Password", message: e.message },
				{ shouldFocus: true }
			);
		}
	};

	return (
		<div className="EntryForm EntryForm--welcome">
			<header>
				<button aria-label="Close" onClick={() => resetForm({ goBack: true })}>
					<BackSvg />
				</button>
				<h1 className="EntryForm__title">Log In</h1>
				<div></div>
			</header>
			<form
				className="EntryForm__form"
				onSubmit={handleSubmit(onSubmitLogin)}
				autoComplete="off"
			>
				<div className="MuiContainer">
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
						fullWidth
						{...register("passwordLogin")}
					/>
					<button type="button" onClick={clickShowPassword}>
						{showPassword ? "hide" : "show"}
					</button>
				</div>
				<ShowPasswordButton
					showPassword
					handleClick={clickShowPassword}
				/>
			</form>
		</div>
	);
}

export default Login;
