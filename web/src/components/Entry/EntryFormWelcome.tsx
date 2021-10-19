import TextField from "@material-ui/core/TextField";
import useVerifyEmail from "../../hooks/useVerifyEmail";
import FormError from "./EntryFormError";
import { useModal } from "../../context/ModalContext";
import { emailRegex } from "../../utils/regex";

import { ReactComponent as DemoSvg } from "../../assets/icons/demo.svg";
import { ReactComponent as ExitSvg } from "../../assets/icons/exit.svg";
import { ReactComponent as GoogleSvg } from "../../assets/icons/google.svg";
import { sleep, typeWriter } from "../../utils/typeWriter";
import SubmitButton from "./SubmitButton";

const VERIFIED = "verified";
const SIGNUP = "signup";

function Welcome({ form, setVerified, handleCloseModal, isModal }: any) {
	const { demoClicked, setDemoClicked } = useModal();

	const {
		handleSubmit,
		setValue,
		register,
		setFocus,
		getValues,
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
			setFocus("email");
			await typeWriter("email", "demo.account@gmail.com", setValue);
			await onSubmitEmail({ email: getValues("email") });

			await sleep(500);

			const submitPassword = document.querySelector(
				".EntryForm__main__form__submit-button"
			) as HTMLElement;

			setFocus("passwordLogin");
			await typeWriter("passwordLogin", "public", setValue);
			submitPassword.click();
		} catch (e) {
			setDemoClicked(false);
		}
	};

	const inputProps = demoClicked ? { shrink: true } : undefined;
	const hideClose = isModal ? "" : "hide";

	return (
		<div className="EntryForm EntryForm--welcome">
			<header>
				<button
					className={`EntryForm__close ${hideClose}`}
					onClick={handleCloseModal}
				>
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
						<SubmitButton loading={verifyLoad}>
							Continue
						</SubmitButton>
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
