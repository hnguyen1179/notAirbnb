import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useVerifyEmail from "../../hooks/useVerifyEmail";
import useLogin from "../../hooks/useLogin";
import useSignup from "../../hooks/useSignup";
import { getAge } from "../../utils/age";
import PasswordHints from "./PasswordHints";

const VERIFIED = "verified";
const UNVERIFIED = "unverified";
const SIGNUP = "signup";

interface FormValues {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	birthday: string;
}

const symbolRegex = /[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,./]/;
const emailRegex =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function AuthenticatedForm() {
	const [showHints, setShowHints] = useState(false);
	const [error, setError] = useState("");
	const [verified, setVerified] = useState(UNVERIFIED);

	const {
		handleSubmit,
		register,
		setValue,
		getValues,
		reset,
		watch,
		trigger,
		formState: { errors },
	} = useForm<FormValues>({
		criteriaMode: "all",
	});

	const watchPassword = watch("password");

	const [login, { loading: loginLoad }] = useLogin();
	const [verifyEmail, { loading: verifyLoad }] = useVerifyEmail();
	const [signup, { loading: signupLoad }] = useSignup();

	const resetForm = () => {
		setError("");
		setVerified(UNVERIFIED);
		reset();
	};

	const onSubmitLogin = async (payload: any) => {
		try {
			const { email, password } = payload;
			await login(email, password);
			resetForm();
		} catch (e) {
			// TODO: Figure out how to send back invalid passwords into the password error field
			setError(e.message);
		}
	};

	const onSubmitEmail = async (payload: any) => {
		const { email } = payload;
		const res = await verifyEmail(email);
		setValue("password", "");
		setVerified(res.data.verifyEmail ? VERIFIED : SIGNUP);
	};

	const onSubmitSignup = async (payload: any) => {
		try {
			const { email, password, firstName, lastName } = payload;
			await signup(email, password, firstName, lastName);
			resetForm();
		} catch (e) {
			// TODO: Figure out how to send back email already exists into the email error field
			setError(e.message);
		}
	};

	// Validator for Password Field
	const containsInformation = (value: string) => {
		const email = getValues("email");
		const firstName = getValues("firstName");
		const lastName = getValues("lastName");

		const emailCond = !value.includes(email.split("@")[0]);
		const firstNameCond = !value.includes(firstName);
		const lastNameCond = !value.includes(lastName);

		const condition =
			(email.length > 0 ? emailCond : true) &&
			(firstName.length > 0 ? firstNameCond : true) &&
			(lastName.length > 0 ? lastNameCond : true);
		return condition || "Can't contain your name or email address";
	};

	// Validator for Age Field
	const adult = (value: string) => {
		if (value) return getAge(value) >= 18 || "Must be older than 18";
	};

	if (verified === UNVERIFIED)
		return (
			<div>
				<h1>Welcome!</h1>
				{error}
				<form onSubmit={handleSubmit(onSubmitEmail)}>
					<div>
						<input
							type="email"
							{...register("email", {
								required: "This field is required",
								pattern: {
									value: emailRegex,
									message: "Must be a valid email address",
								},
							})}
						/>
						{errors.email && <span>{errors.email.message}</span>}
					</div>
					<button type="submit" disabled={verifyLoad}>
						Continue
					</button>
				</form>
			</div>
		);

	if (verified === VERIFIED)
		return (
			<div>
				<h1>Log In</h1>
				{error}
				<form onSubmit={handleSubmit(onSubmitLogin)}>
					<div>
						<input type="password" {...register("password")} />
						{errors.password}
					</div>
					<button type="submit" disabled={loginLoad}>
						Log In
					</button>
				</form>
			</div>
		);
	console.log("Auth Form Rerendered");
	// Defaults to the sign up form
	return (
		<div>
			<h1>sign up</h1>
			{error}
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
					{errors.email && <span>{errors.email.message}</span>}
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
								adult,
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
								containsInformation,
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

export default AuthenticatedForm;
