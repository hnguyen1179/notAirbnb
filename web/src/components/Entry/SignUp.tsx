import React from "react";
import { useModal } from "../../context/ModalContext";
import useSignup from "../../hooks/useSignup";
import PasswordHints from "./PasswordHints";

import TextField from "@material-ui/core/TextField";
import FormError from "./FormError";

import { emailRegex, symbolRegex } from "../../utils/regex";
import { containsInformation, isAdult } from "../../utils/validators";
import ShowPasswordButton from "./ShowPasswordButton";
import { ReactComponent as BackSvg } from "../../assets/svgs/back.svg";
import LoadingButton from "./LoadingButton";

function SignUp({
	form,
	setVerified,
	showHints,
	setShowHints,
	resetForm,
	showPassword,
	clickShowPassword,
}: any) {
	const { getCursorPos } = useModal();

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
	const watchPassword = watch("password") || "";
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
				<h1 className="EntryForm__title">Finish signing up</h1>
				<div></div>
			</header>
			<main className="EntryForm__main">
				<form
					className="EntryForm__form"
					onSubmit={handleSubmit(onSubmitSignup)}
					autoComplete="off"
				>
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
						{!errors.lastName && !errors.firstName && (
							<div className="MuiContainer__input-subtext">
								Make sure both names match the names on your
								government ID.
							</div>
						)}
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
						{!errors.birthday && (
							<div className="MuiContainer__input-subtext">
								To sign up, you need to be at least 18. Your
								birthday won’t be shared with other people who
								use notAirbnb.
							</div>
						)}
					</div>

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
						{!errors.email && (
							<span className="MuiContainer__input-subtext">
								We'll email you trip confirmations and receipts. (Not really)
							</span>
						)}
					</div>

					<div className="MuiContainer MuiContainer--password">
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
									message:
										"Must be at least 8 characters long",
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
							showPassword={showPassword}
							handleClick={clickShowPassword}
						/>
					</div>
					<aside className="EntryForm__main__form__mumbo-jumbo">
						<p>
							By selecting{" "}
							<span className="bold">Agree and continue</span>{" "}
							below, I agree to notAirbnb’s{" "}
							<span className="terms">Terms of Service</span>,{" "}
							<span className="terms">
								Payments Terms of Service
							</span>
							, <span className="terms">Privacy Policy</span>, and{" "}
							<span className="terms">
								Nondiscrimination Policy
							</span>
							.
						</p>
					</aside>
					<button
						className="EntryForm__main__form__submit-button"
						type="submit"
						disabled={signupLoad}
						onMouseMove={(e) => getCursorPos(e)}
					>
						<span className="gradient-container">
							{signupLoad ? (
								<LoadingButton />
							) : (
								<span className="gradient"></span>
							)}
						</span>
						<span className="submit-button__text">
							Agree and continue
						</span>
					</button>
				</form>
			</main>
		</div>
	);
}

export default SignUp;
