import React from "react";
import TextField from "@material-ui/core/TextField";
import useVerifyEmail from "../../hooks/useVerifyEmail";
import FormError from "./FormError";
import { useModal } from "../../context/ModalContext";
import { ReactComponent as ExitSvg } from "../../assets/svgs/exit.svg";
import { emailRegex } from "../../utils/regex";
import LoadingButton from "./LoadingButton";

import { ReactComponent as GoogleSvg } from "../../assets/svgs/google.svg";

const VERIFIED = "verified";
const SIGNUP = "signup";

function Welcome({ form, setVerified, handleCloseModal }: any) {
	const { getCursorPos } = useModal();

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
							{verifyLoad ? (
								<LoadingButton />
							) : (
								<span className="gradient"></span>
							)}
						</span>
						<span className="submit-button__text">Continue</span>
					</button>
				</form>
				<div className="EntryForm__main__divider">
					<span className="EntryForm__main__divider__or">or</span>
				</div>
				<div className="EntryForm__main__auth-container">
					<button className="EntryForm__main__auth-container__auth EntryForm__main__auth-container__auth--google">
						<div>
							<GoogleSvg />
						</div>
						<div>Continue with Google</div>
						<div></div>
					</button>
				</div>
			</main>
		</div>
	);
}

export default Welcome;
