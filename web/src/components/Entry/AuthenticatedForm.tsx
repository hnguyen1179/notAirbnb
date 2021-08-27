import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useModal } from "../../context/ModalContext";

import Welcome from "./Welcome";
import Login from "./Login";
import SignUp from "./SignUp";

const VERIFIED = "verified";
const UNVERIFIED = "unverified";

interface FormValues {
	email: string;
	password: string;
	passwordLogin: string;
	firstName: string;
	lastName: string;
	birthday: string;
}

function AuthenticatedForm() {
	const { entry, setOpen } = useModal();
	const [showPassword, setShowPassword] = useState(false);
	const [showHints, setShowHints] = useState(false);
	const [verified, setVerified] = useState(entry);

	const form = useForm<FormValues>({
		criteriaMode: "all",
	});

	const clickShowPassword = () => {
		setShowPassword((prev: boolean) => !prev);
	};

	const resetForm = (option = { goBack: false }) => {
		const { goBack } = option;
		form.reset();
		setVerified(UNVERIFIED);
		if (!goBack) setOpen(false);
	};

	const handleCloseModal = () => {
		setOpen(false)
	}

	// Email validator stage
	if (verified === UNVERIFIED)
		return (
			<Welcome
				form={form}
				setVerified={setVerified}
				handleCloseModal={handleCloseModal}
			/>
		);

	// Email is validated, Password input stage before log in validations
	if (verified === VERIFIED)
		return (
			<Login
				form={form}
				setVerified={setVerified}
				showPassword={showPassword}
				clickShowPassword={clickShowPassword}
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
			showPassword={showPassword}
			clickShowPassword={clickShowPassword}
			resetForm={resetForm}
		/>
	);
}

export default AuthenticatedForm;
