import React from "react";
import TextField from "@material-ui/core/TextField";
import useVerifyEmail from "../../hooks/useVerifyEmail";
import FormError from "./FormError";
import { useModal } from "../../context/ModalContext";
import { emailRegex } from "../../utils/regex";
import LoadingButton from "./LoadingButton";

import { ReactComponent as DemoSvg } from "../../assets/svgs/demo.svg";
import { ReactComponent as ExitSvg } from "../../assets/svgs/exit.svg";
import { ReactComponent as GoogleSvg } from "../../assets/svgs/google.svg";
import { sleep, typeWriter } from "../../utils/typeWriter";

const VERIFIED = "verified";
const SIGNUP = "signup";

function Welcome({ form, setVerified, handleCloseModal }: any) {
	const { getCursorPos, demoClicked, setDemoClicked } = useModal();

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

	const clickDemo = async () => {
		try {
			const email = document.querySelector(
				'input[name="email"]'
			) as HTMLInputElement;
			const submitEmail = document.querySelector(
				'button[type="submit"]'
			) as HTMLElement;

			email.focus();
			await typeWriter("email", "demo@demo.com", setValue);
			submitEmail.click();

			await sleep(1250);

			const password = document.querySelector(
				'input[name="passwordLogin"]'
			) as HTMLInputElement;
			const submitPassword = document.querySelector(
				'button[type="submit"]'
			) as HTMLElement;

			password.focus();
			await typeWriter("passwordLogin", "1password", setValue);
			submitPassword.click();
		} catch (e) {
			setDemoClicked(false);
		}
	};

	const inputProps = demoClicked ? { shrink: true } : undefined;

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
							InputLabelProps={inputProps}
							{...register("email", {
								required: "This field is required",
								pattern: {
									value: emailRegex,
									message: "Must be a valid email address",
								},
							})}
						/>
					</div>
					<div>
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
							<span className="submit-button__text">
								Continue
							</span>
						</button>
					</div>
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
					<button
						className="EntryForm__main__auth-container__auth EntryForm__main__auth-container__auth--demo"
						onClick={() => {
							setDemoClicked(true);
							clickDemo();
						}}
					>
						<div>
							<DemoSvg style={{ width: "25px" }} />
						</div>
						<div>Use Demo Account</div>
						<div></div>
					</button>
				</div>
			</main>
		</div>
	);
}

export default Welcome;
