import React, { useEffect } from "react";

const ERROR_NAMES = [
	"Can't contain your name or email address",
	"Must be at least 8 characters long",
	"Contains a number or symbol",
];

const GREEN = "green";
const RED = "red";
const REQUIRED = "required"

const DEFAULTS = [true, false, false];

interface Props {
	errors: any;
	passwordLength: boolean;
	passwordStrong: boolean;
}

const PasswordHints: React.FC<Props> = ({
	errors,
	passwordLength,
	passwordStrong,
}: any) => {
	if (!errors && passwordLength) {
		return (
			<ul>
				<li style={{color: GREEN}}>
					{passwordStrong
						? "Password strength: strong"
						: "Password strength: good"}
				</li>
			</ul>
		);
	}

	return (
		<ul>
			<li style={{color: RED}}>Password strength: weak</li>
			{errors && errors.type !== REQUIRED
				? ERROR_NAMES.map((error: string) => {
						return (
							<li
								style={{
									color: !Object.values(
										errors.types
									).includes(error)
										? GREEN
										: RED,
								}}
							>
								{error}
							</li>
						);
				  })
				: ERROR_NAMES.map((error: string, idx: any) => {
						return (
							<li
								style={{
									color: DEFAULTS[idx] ? GREEN : RED,
								}}
							>
								{error}
							</li>
						);
				  })}
		</ul>
	);
};

export default PasswordHints;
