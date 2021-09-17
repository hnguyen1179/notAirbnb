import React from "react";
import { animated, useSpring, config } from "react-spring";

interface FadeProps {
	children?: React.ReactElement;
	in: boolean;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>((props, ref) => {
	const { in: open, children, ...other } = props;

	const style = useSpring({
		from: { opacity: 0, transform: "translateY(70vh)" },
		to: {
			opacity: 1,
			transform: "translateY(50vh)",
		},
		config: config.stiff,
	});

	return (
		<animated.div ref={ref} style={style} {...other}>
			{children}
		</animated.div>
	);
});

export default Fade;
