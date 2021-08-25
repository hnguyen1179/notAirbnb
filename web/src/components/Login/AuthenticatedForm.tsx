import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Welcome from "./Welcome";
import Login from "./Login";
import SignUp from "./SignUp";

const VERIFIED = "verified";
const UNVERIFIED = "unverified";
interface FormValues {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	birthday: string;
}

function AuthenticatedForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [showHints, setShowHints] = useState(false);
	const [verified, setVerified] = useState(UNVERIFIED);

	const form = useForm<FormValues>({
		criteriaMode: "all",
	});

	const resetForm = () => {
		setVerified(UNVERIFIED);
		form.reset();
	};

	// Email validator stage
	if (verified === UNVERIFIED)
		return <Welcome form={form} setVerified={setVerified} />;

	// Email is validated, Password input stage before log in validations
	if (verified === VERIFIED)
		return (
			<Login
				form={form}
				setVerified={setVerified}
				showPassword={showPassword}
				setShowPassword={setShowPassword}
				resetForm={resetForm}
			/>
		);

	// Defaults to the sign up form
	return (
		<SignUp
			form={form}
			setVerified={setVerified}
			showHints={showHints}
			setShowHints={setShowHints}
			resetForm={resetForm}
		/>
	);
}

export default AuthenticatedForm;
