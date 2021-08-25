import React from "react";
import TextField from "@material-ui/core/TextField";
import useVerifyEmail from "../../hooks/useVerifyEmail";
import FormError from "./FormError";
import { emailRegex } from "../../utils/regex";

const VERIFIED = "verified";
const SIGNUP = "signup";

function Welcome({ form, setVerified }: any) {
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
		setValue("password", "");
		setVerified(res.data.verifyEmail ? VERIFIED : SIGNUP);
	};

	return (
		<div className="MuiContainer">
			<h1>Welcome!</h1>
			<form onSubmit={handleSubmit(onSubmitEmail)}>
				<div>
					<TextField
						error={!!errors.email}
						helperText={<FormError error={errors.email?.message} />}
						label="Email"
						placeholder="Email"
						variant="outlined"
						{...register("email", {
							required: "This field is required",
							pattern: {
								value: emailRegex,
								message: "Must be a valid email address",
							},
						})}
					/>
				</div>
				<button type="submit" disabled={verifyLoad}>
					Continue
				</button>
			</form>
		</div>
	);
}

export default Welcome;
