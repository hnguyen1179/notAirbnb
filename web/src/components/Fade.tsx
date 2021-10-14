import { ReactElement, forwardRef } from "react";
import { animated, useSpring, config } from "react-spring";

interface FadeProps {
	children?: ReactElement;
	style?: any;
	configType?: "default" | "stiff";
}

const defaultStyle = {
	from: { opacity: 0, transform: "translateY(70vh)" },
	to: {
		opacity: 1,
		transform: "translateY(50vh)",
	},
	config: config.stiff,
};

const Fade = forwardRef<HTMLDivElement, FadeProps>((props, ref) => {
	const { children, style = defaultStyle, configType = 'default', ...other } = props;
	
	if (style) {
		if (configType) style.config = config[configType];
	}

	return (
		<animated.div style={useSpring(style)} {...other} ref={ref}>
			{children}
		</animated.div>
	);
});

export default Fade;
