import React from "react";
import useSignup from "../../hooks/useSignup";
import PasswordHints from "./PasswordHints";

import TextField from "@material-ui/core/TextField";
import FormError from "./FormError";

import { emailRegex, symbolRegex } from "../../utils/regex";
import { containsInformation, isAdult } from "../../utils/validators";

function SignUp({
	form,
	setVerified,
	showHints,
	setShowHints,
	resetForm,
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
		trigger("password");
		return true;
	};

	const redirectToLogin = () => {
		setValue("passwordLogin", "");
		setVerified("verified");
	};

	return (
		<div>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit(onSubmitSignup)} autoComplete="off">
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
						helperText={
							showHints && (
								<PasswordHints
									errors={errors.password}
									passwordLength={watchPassword.length >= 8}
									passwordStrong={
										!!watchPassword.match(symbolRegex)
									}
								/>
							)
						}
						type="password"
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
				</div>
				<button type="submit" disabled={signupLoad}>
					Sign Up
				</button>
			</form>
		</div>
	);
}

export default SignUp;
