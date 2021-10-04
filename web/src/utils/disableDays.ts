const disableDay = (date: Date) => {
	return date < new Date();
};

export { disableDay };
