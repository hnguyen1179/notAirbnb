import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import useVerifyEmail from "../../hooks/useVerifyEmail";
import FormError from "./FormError";
import { ReactComponent as ExitSvg } from "../../assets/svgs/exit.svg";
import { emailRegex } from "../../utils/regex";
import { getCurves } from "crypto";

const VERIFIED = "verified";
const SIGNUP = "signup";

function Welcome({ form, setVerified, handleCloseModal }: any) {
	const {
		handleSubmit,
		setValue,
		register,
		formState: { errors },
	} = form;
	const [verifyEmail, { loading: verifyLoad }] = useVerifyEmail();

	const onSubmitEmail = async (payload: any) => {
		const { email } = payload;
		const res = await verifyEmail(email);
		setValue("passwordLogin", "");
		setVerified(res.data.verifyEmail ? VERIFIED : SIGNUP);
	};

	console.log("refreshed!");

	function getCursorPos(a: any) {
		const submitButton = document.querySelector(
			".EntryForm__main__form__submit-button"
		);

		const posX = a.clientX;
		const posY = a.clientY;

		const container = document.querySelector(".EntryFormContainer");

		if (container && submitButton) {
			const { left, top, right, bottom } =
				submitButton?.getBoundingClientRect();
			const width = right - left;
			const widthDiff = posX - left;
			const height = bottom - top;
			const heightDiff = posY - top;

			console.log(widthDiff);
			console.log(width);

			document.documentElement.style.setProperty(
				"--mouse-x",
				(widthDiff / width).toString()
			);
			document.documentElement.style.setProperty(
				"--mouse-y",
				(heightDiff / height).toString()
			);
		}
	}

	return (
		<div className="EntryForm EntryForm--welcome">
			<header>
				<button onClick={handleCloseModal}>
					<ExitSvg />
				</button>
				<h1 className="EntryForm__title">Log in or sign up</h1>
				<div></div>
			</header>
			<main className="EntryForm__main">
				<div className="EntryForm__main__subtitle">
					<h3>Welcome to notAirbnb</h3>
				</div>
				<form
					className="EntryForm__main__form"
					onSubmit={handleSubmit(onSubmitEmail)}
					autoComplete="off"
				>
					<div className="MuiContainer">
						<TextField
							error={!!errors.email}
							helperText={
								<FormError error={errors.email?.message} />
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
							})}
						/>
					</div>
					<button
						className="EntryForm__main__form__submit-button"
						type="submit"
						disabled={verifyLoad}
						onMouseMove={(e) => getCursorPos(e)}
					>
						<span className="gradient-container">
							<span className="gradient"></span>
						</span>
						<span className="submit-button__text">Continue</span>
					</button>
				</form>
				<div className="EntryForm__main__divider">
					<span className="EntryForm__main__divider__or">or</span>
				</div>
				<button className="EntryForm__main__google-auth">
					filler for Google OAuth
				</button>
			</main>
		</div>
	);
}

export default Welcome;
