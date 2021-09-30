import { ReactComponent as CheckmarkSvg } from "../../assets/icons/checkmark.svg";

const houseRulesEnum = ["Pets allowed", "Smoking allowed"];

interface Props {
	pets: boolean;
	smoking: boolean;
	handleToggleBooleanField: React.ChangeEventHandler<HTMLInputElement>;
}

type RulesField = "pets" | "smoking";

const SectionRules = (props: Props) => {
	const { handleToggleBooleanField } = props;
	return (
		<>
			<h2>House rules</h2>
			{houseRulesEnum.map((rule) => {
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
								onChange={handleToggleBooleanField}
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
