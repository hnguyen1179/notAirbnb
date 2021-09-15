type FieldName = string;
type Input = string;
type Setter = (x: string, y: string) => void;

const sleep = (milliseconds: number) => {
	return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const typeWriter = async (field: FieldName, input: Input, setter: Setter) => {
	for (let i = 1; i <= input.length; i++) {
		setter(field, input.slice(0, i));
		await sleep(Math.random() * 20 + 10);
	}
};

export { sleep, typeWriter };
