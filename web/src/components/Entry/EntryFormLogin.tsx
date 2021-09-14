import { useModal } from "../../context/ModalContext";
import useLogin from "../../hooks/useLogin";
import TextField from "@material-ui/core/TextField";
import FormError from "./EntryFormError";
import ShowPasswordButton from "./ShowPasswordButton";
import { ReactComponent as BackSvg } from "../../assets/icons/back.svg";
import SubmitButton from "./SubmitButton";
import { withRouter } from "react-router";

function Login({
	form,
	showPassword,
	clickShowPassword,
	resetForm,
	isModal,
	history, // withRouter prop
}: any) {
	const { demoClicked, setDemoClicked } = useModal();
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
			setDemoClicked(false);
			document.body.style.overflow = "initial";

			// If logging in via the /login page, redirect to landing
			if (!isModal) {
				history.push("/");
			}
		} catch (e) {
			setError(
				"passwordLogin",
				{ type: "Invalid Password", message: e.message },
				{ shouldFocus: true }
			);
		}
	};

	const inputProps = demoClicked ? { shrink: true } : undefined;

	return (
		<div className="EntryForm EntryForm--login">
			<header>
				<button onClick={() => resetForm({ goBack: true })}>
					<BackSvg />
				</button>
				<h1 className="EntryForm__title">Log In</h1>
				<div></div>
			</header>
			<main className="EntryForm__main">
				<form
					className="EntryForm__main__form"
					onSubmit={handleSubmit(onSubmitLogin)}
					autoComplete="off"
				>
					<div className="MuiContainer MuiContainer--password">
						{/* Login password input requires no validation except for server side validations (invalid password) */}
						<TextField
							error={errors.passwordLogin}
							helperText={
								<FormError
									error={errors.passwordLogin?.message}
								/>
							}
							type={showPassword ? "text" : "password"}
							label="Password"
							placeholder="Password"
							variant="outlined"
							fullWidth
							InputLabelProps={inputProps}
							{...register("passwordLogin")}
						/>
						<ShowPasswordButton
							showPassword={showPassword}
							handleClick={clickShowPassword}
						/>
					</div>
					<SubmitButton loading={loginLoad}>Log in</SubmitButton>
				</form>
				<div className="EntryForm__main__recover-password">
					<button>Forgot password?</button>
				</div>
			</main>
		</div>
	);
}

export default withRouter(Login);
