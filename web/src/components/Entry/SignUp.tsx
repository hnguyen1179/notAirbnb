import React from "react";
import useSignup from "../../hooks/useSignup";
import PasswordHints from "./PasswordHints";

import TextField from "@material-ui/core/TextField";
import FormError from "./FormError";

import { emailRegex, symbolRegex } from "../../utils/regex";
import { containsInformation, isAdult } from "../../utils/validators";
import ShowPasswordButton from "./ShowPasswordButton";
import { ReactComponent as BackSvg } from "../../assets/svgs/back.svg";

function SignUp({
	form,
	setVerified,
	showHints,
	setShowHints,
	resetForm,
	showPassword,
	clickShowPassword,
}: any) {
	const {
		register,
		trigger,
		handleSubmit,
		getValues,
		setError,
		setValue,
		watch,
		formState: { errors },
	} = form;
	const watchPassword = watch("password");

	const [signup, { loading: signupLoad }] = useSignup();

	const onSubmitSignup = async (payload: any) => {
		try {
			const { email, password, firstName, lastName } = payload;
			await signup(email, password, firstName, lastName);
			resetForm();
		} catch (e) {
			// TODO: Figure out how to send back email already exists into the email error field
			setError(
				"email",
				{ type: "Duplicate Email", message: e.message },
				{ shouldFocus: true }
			);
		}
	};

	const triggerPassword = () => {
		if (getValues("password").length > 0) trigger("password");
		return true;
	};

	const redirectToLogin = () => {
		setValue("passwordLogin", "");
		setVerified("verified");
	};

	const renderPasswordError = showHints ? (
		<PasswordHints
			errors={errors.password}
			passwordLength={watchPassword.length >= 8}
			passwordStrong={!!watchPassword.match(symbolRegex)}
		/>
	) : (
		<FormError error={errors.password?.message} />
	);

	return (
		<div className="EntryForm EntryForm--signup">
			<header>
				<button onClick={() => resetForm({ goBack: true })}>
					<BackSvg />
				</button>
				<h1 className="EntryForm__title">Sign Up</h1>
				<div></div>
			</header>
			<form
				className="EntryForm__form"
				onSubmit={handleSubmit(onSubmitSignup)}
				autoComplete="off"
			>
				<div className="MuiContainer">
					<TextField
						error={!!errors.email}
						helperText={
							<FormError
								error={errors.email?.message}
								redirect={redirectToLogin}
							/>
						}
						label="Email"
						placeholder="Email"
						variant="outlined"
						fullWidth
						{...register("email", {
							required: "This field is required",
							pattern: {
								value: emailRegex,
								message: "Must be a valid email address",
							},
							validate: {
								triggerPassword,
							},
						})}
					/>
				</div>
				<div className="MuiContainer">
					<TextField
						error={!!errors.firstName}
						helperText={
							<FormError error={errors.firstName?.message} />
						}
						label="First Name"
						placeholder="First Name"
						variant="outlined"
						fullWidth
						{...register("firstName", {
							required: "This field is required",
							pattern: {
								value: /^\S*$/,
								message: "Must contain valid characters",
							},
							validate: {
								triggerPassword,
							},
						})}
					/>
				</div>
				<div className="MuiContainer">
					<TextField
						error={!!errors.lastName}
						helperText={
							<FormError error={errors.lastName?.message} />
						}
						label="Last Name"
						placeholder="Last Name"
						variant="outlined"
						fullWidth
						{...register("lastName", {
							required: "This field is required",
							pattern: {
								value: /^\S*$/,
								message: "Must contain valid characters",
							},
							validate: {
								triggerPassword,
							},
						})}
					/>
				</div>

				<div className="MuiContainer">
					<TextField
						error={!!errors.birthday}
						helperText={
							<FormError error={errors.birthday?.message} />
						}
						type="date"
						label="Birthdate"
						placeholder="Birthdate"
						variant="outlined"
						fullWidth
						{...register("birthday", {
							required: "This field is required",
							validate: {
								isAdult,
							},
						})}
					/>
				</div>

				<div className="MuiContainer">
					<TextField
						error={!!errors.password}
						helperText={renderPasswordError}
						type={showPassword ? "text" : "password"}
						label="Password"
						placeholder="Password"
						variant="outlined"
						onFocus={() => setShowHints(true)}
						fullWidth
						{...register("password", {
							required: "This field is required",
							minLength: {
								value: 8,
								message: "Must be at least 8 characters long",
							},
							pattern: {
								value: /\w*[\d\W~]+\w*/,
								message: "Contains a number or symbol",
							},
							validate: {
								containsInformation: (v: string) =>
									containsInformation(v, getValues),
							},
						})}
					/>
					<ShowPasswordButton
						showPassword
						handleClick={clickShowPassword}
					/>
				</div>
				<button type="submit" disabled={signupLoad}>
					Sign Up
				</button>
			</form>
		</div>
	);
}

export default SignUp;
