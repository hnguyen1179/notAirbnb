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
	const firstNameCond = !value.includes(firstName);
	const lastNameCond = !value.includes(lastName);

	const condition =
		(email.length > 0 ? emailCond : true) &&
		(firstName.length > 0 ? firstNameCond : true) &&
		(lastName.length > 0 ? lastNameCond : true);
	return condition || "Can't contain your name or email address";
};

// Validator for Age Field
const isAdult = (value: string) => {
	if (value) return getAge(value) >= 18 || "Must be older than 18";
};

export { getAge, containsInformation, isAdult };
