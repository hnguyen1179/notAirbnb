// Helper function for adult
const getAge = (DOB: string) => {
	let today = new Date();
	let birthDate = new Date(DOB);
	let age = today.getFullYear() - birthDate.getFullYear();
	let m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
};

// Validator for Password Field
const containsInformation = (value: string, getValues: any) => {
	const email = getValues("email");
	const firstName = getValues("firstName");
	const lastName = getValues("lastName");

	const emailCond = !value.includes(email.split("@")[0]);
	const firstNameCond = !new RegExp(firstName, "i").test(value);
	const lastNameCond = !new RegExp(lastName, "i").test(value);

	const condition =
		(email.length > 0 ? emailCond : true) &&
		(firstName.length > 0 ? firstNameCond : true) &&
		(lastName.length > 0 ? lastNameCond : true);
	return condition || "Can't contain your name or email address";
};

// Validator for Age Field
const isAdult = (value: string) => {
	if (value)
		return (
			getAge(value) >= 18 ||
			"You must be 18 or older to use notAirbnb. Other people won’t see your birthday."
		);
};

export { getAge, containsInformation, isAdult };
