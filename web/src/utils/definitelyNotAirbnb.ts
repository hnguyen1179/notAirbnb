const definitelyNotAirbnb = (text: string) => {
	const variations = [/airbnb/ig, /air-bnb/ig, /air bnb/ig];

	let output = text;

	variations.forEach((variant) => {
		output = output.replaceAll(variant, "notAirbnb");
  });
  
	return output;
};

export { definitelyNotAirbnb };
