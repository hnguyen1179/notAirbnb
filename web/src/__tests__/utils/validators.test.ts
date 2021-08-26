import { getAge, containsInformation, isAdult } from "../../utils/validators";

// Testing getAge
test("getAge gets correct age based on DOB string", () => {
	// Will only work between June 3, 2021 to December 14, 2021 for obvious reasons
	const ageOne = "6/3/1994";
	const ageTwo = "12/15/1993";

	const derivedAgeOne = getAge(ageOne);
	const derivedAgeTwo = getAge(ageTwo);

	expect(derivedAgeOne).toBe(27);
	expect(derivedAgeTwo).toBe(27);
});


// Testing containsInformation
test("containsInformation should return correct boolean or error string", () => {
	const fieldObject: { [key: string]: string } = {
		email: "random@gmail.com",
		firstName: "John",
		lastName: "Doe",
	};

	const getValues = (field: string) => {
		return fieldObject[field];
	};

	// containsInformation takes in a password and a function
	const result1 = containsInformation("password249", getValues);
	const result2 = containsInformation("JohnIsCool", getValues);
	const result3 = containsInformation("DoeADear", getValues);
	const result4 = containsInformation("randomPassword", getValues);

	expect(result1).toBe(true);
	expect(result2).toBe("Can't contain your name or email address");
	expect(result3).toBe("Can't contain your name or email address");
	expect(result4).toBe("Can't contain your name or email address");
});


test("containsInformation should not consider any blank fields", () => {
	const edgeCasesFieldObject: { [key: string]: string } = {
		email: "",
		firstName: "John",
		lastName: "",
	};
	
	const getValues = (field: string) => {
		return edgeCasesFieldObject[field];
	};

	const result1 = containsInformation("randomPassword", getValues);
	const result2 = containsInformation("DoeADear", getValues);

	expect(result1).toBe(true);
	expect(result2).toBe(true);
});

// Testing isAdult
test("isAdult should return correct boolean or error string based on DOB string", () => {
	const result1 = isAdult("6/3/1994");
	const result2 = isAdult("6/3/2015");

	expect(result1).toBe(true);
	expect(result2).toBe("Must be older than 18");
});
