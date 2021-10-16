const nonBreakingSentence = (sentence: string) => {
	const sentenceArray = sentence.split(" ");
	const allButLastWord = sentenceArray.slice(0, sentenceArray.length - 1);
	return (
		allButLastWord.join(" ") +
		String.fromCharCode(160) +
		sentenceArray[sentenceArray.length - 1]
	);
};

export { nonBreakingSentence };
