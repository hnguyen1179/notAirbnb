import { useContext } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { AppContext } from "../context/AppContext";

const ErrorPage = () => {
	const { cloudinary } = useContext(AppContext);

	return (
		<div>
			<AdvancedImage cldImg={cloudinary.image("assets/error")} />
		</div>
	);
};

export default ErrorPage;
