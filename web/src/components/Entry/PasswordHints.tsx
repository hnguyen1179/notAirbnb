import React from "react";
import { ReactComponent as FailSvg } from "../../assets/svgs/negative.svg";
import { ReactComponent as PassSvg } from "../../assets/svgs/positive.svg";

const ERROR_NAMES = [
	"Can't contain your name or email address",
	"Must be at least 8 characters long",
	"Contains a number or symbol",
];

const GREEN = "rgb(0, 138, 5)";
const RED = "rgb(193, 53, 21)";
const REQUIRED = "required";

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
			<ul className="PasswordHints-container">
				<li
					className="PasswordHints-container__item"
					style={{ color: GREEN }}
				>
					<PassSvg />
					{passwordStrong
						? "Password strength: strong"
						: "Password strength: good"}
				</li>
			</ul>
		);
	}

	return (
		<ul className="PasswordHints-container">
			<li
				className="PasswordHints-container__item"
				style={{ color: RED }}
			>
				<FailSvg /> Password strength: weak
			</li>
			{errors && errors.type !== REQUIRED
				? ERROR_NAMES.map((error: string, idx: any) => {
						return (
							<li
								className="PasswordHints-container__item"
								style={{
									color: !Object.values(
										errors.types
									).includes(error)
										? GREEN
										: RED,
								}}
							>
								{DEFAULTS[idx] ? <PassSvg /> : <FailSvg />}
								{error}
							</li>
						);
				  })
				: ERROR_NAMES.map((error: string, idx: any) => {
						return (
							<li
								className="PasswordHints-container__item"
								style={{
									color: DEFAULTS[idx] ? GREEN : RED,
								}}
							>
								{DEFAULTS[idx] ? <PassSvg /> : <FailSvg />}
								{error}
							</li>
						);
				  })}
		</ul>
	);
};

export default PasswordHints;
