import React from "react";
import useSignup from "../../hooks/useSignup";
import PasswordHints from "./PasswordHints";

import TextField from "@material-ui/core/TextField";
import FormErrors from "./FormError";

import { emailRegex, symbolRegex } from "../../utils/regex";
import { containsInformation, isAdult } from "../../utils/validators";

const VERIFIED = "verified";

function SignUp({ form, setVerified, showHints, setShowHints, resetForm }: any) {
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

	return (
		<div>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit(onSubmitSignup)}>
				<div>
					<input
						type="email"
						placeholder="Email Address"
						{...register("email", {
							required: "This field is required",
							pattern: {
								value: emailRegex,
								message: "Must be a valid email address",
							},
							validate: () => {
								trigger("password");
								return true;
							},
						})}
					/>
					{errors.email && (
						<span>
							{errors.email.message}{" "}
							<span
								onClick={() => {
									setValue("password", "");
									setVerified(VERIFIED);
								}}
							>
								{errors.email.type === "Duplicate Email" &&
									"Sign In"}
							</span>
						</span>
					)}
				</div>
				<div>
					<input
						type="text"
						placeholder="First Name"
						{...register("firstName", {
							required: "This field is required",
							pattern: {
								value: /^\S*$/,
								message: "Must contain valid characters",
							},
							validate: () => {
								trigger("password");
								return true;
							},
						})}
					/>
					{errors.firstName && (
						<span>{errors.firstName.message}</span>
					)}
				</div>
				<div>
					<input
						type="text"
						placeholder="Last Name"
						{...register("lastName", {
							required: "This field is required",
							pattern: {
								value: /^\S*$/,
								message: "Must contain valid characters",
							},
							validate: () => {
								trigger("password");
								return true;
							},
						})}
					/>
					{errors.lastName && <span>{errors.lastName.message}</span>}
				</div>
				<div>
					<input
						type="date"
						{...register("birthday", {
							required: "This field is required",
							validate: {
								isAdult,
							},
						})}
					/>
					{errors.birthday && <span>{errors.birthday.message}</span>}
				</div>
				<div>
					<input
						type="password"
						placeholder="Password"
						onFocus={() => setShowHints(true)}
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
                containsInformation: (v: string) => containsInformation(v, getValues),
							},
						})}
					/>
					{showHints && (
						<PasswordHints
							errors={errors.password}
							passwordLength={watchPassword.length >= 8}
							passwordStrong={!!watchPassword.match(symbolRegex)}
						/>
					)}
				</div>
				<button type="submit" disabled={signupLoad}>
					Sign Up
				</button>
			</form>
		</div>
	);
}

export default SignUp;
