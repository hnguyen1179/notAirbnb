import { AdvancedImage } from "@cloudinary/react";
import { useAppState } from "../context/AppContext";

const ErrorPage = () => {
	const { cloudinary } = useAppState();

	return (
		<div>
			<AdvancedImage cldImg={cloudinary.image("assets/error")} />
		</div>
	);
};

export default ErrorPage;
