import { FC } from "react";

type Components = any | [any, { [key: string]: any }];

interface Props {
	components: Components[];
}

export const Compose: FC<Props> = ({ components, children }) => (
	<>
		{components.reverse().reduce((acc, curr) => {
			const [Provider, props] = Array.isArray(curr)
				? [curr[0], curr[1]]
				: [curr, {}];
			return <Provider {...props}>{acc}</Provider>;
		}, children)}
	</>
);
