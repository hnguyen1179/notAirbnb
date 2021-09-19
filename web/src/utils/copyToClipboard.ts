const copyToClipboard = async (text: string) => {
	if ("clipboard" in navigator) {
		return navigator.clipboard.writeText(text);
	} else {
		return document.execCommand("copy", true, text);
	}
};

export { copyToClipboard };
