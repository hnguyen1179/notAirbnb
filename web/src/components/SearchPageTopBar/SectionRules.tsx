import { ChangeEvent } from "react";
import { ReactComponent as CheckmarkSvg } from "../../assets/icons/checkmark.svg";

const houseRulesEnum = ["Pets allowed", "Smoking allowed"];

interface Props {
	pets: boolean;
	smoking: boolean;
	handleToggleBooleanField: (
		e: ChangeEvent<HTMLInputElement>,
		field: RulesField
	) => void;
}

type RulesField = "pets" | "smoking";

const SectionRules = (props: Props) => {
	const { handleToggleBooleanField } = props;
	return (
		<>
			<h2>House rules</h2>
			{houseRulesEnum.map((rule, idx) => {
				const field = rule.split(" ")[0].toLowerCase() as RulesField;

				return (
					<div
						key={`rule-${rule.replaceAll(" ", "-")}`}
						className="type"
					>
						<label htmlFor={`rule-${rule.replaceAll(" ", "-")}`}>
							<div>{rule}</div>
						</label>
						<div className="checkbox-container">
							<input
								id={`rule-${rule.replaceAll(" ", "-")}`}
								type="checkbox"
								checked={!!props[field]}
								value={field}
								onChange={(e) =>
									handleToggleBooleanField(e, field)
								}
							/>
							<span className="checkbox">
								<CheckmarkSvg />
							</span>
						</div>
					</div>
				);
			})}
		</>
	);
};

export default SectionRules;
