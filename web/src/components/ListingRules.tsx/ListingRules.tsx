import { Maybe } from "graphql/jsutils/Maybe";
import { definitelyNotAirbnb } from "../../utils/definitelyNotAirbnb";

interface Props {
	houseRules: Maybe<string>[];
	healthAndSafety: Maybe<string>[];
}

const renderHealthImageLink = (rule: string) => {
	if (/carbon/i.test(rule)) {
		return "carbon";
	} else if (/climbing|water|tub|camera|animal/i.test(rule)) {
		return "climbing_water_tub_camera_animal";
	} else if (/covid/i.test(rule)) {
		return "covid";
	} else if (/deposit/i.test(rule)) {
		return "deposit";
	} else if (/enhanced/i.test(rule)) {
		return "enhanced";
	} else if (/smoke/i.test(rule)) {
		return "smoke";
	}
	return "";
};

const ListingRules = (props: Props) => {
	return (
		<div className="ListingRules">
			<h2>Things to know</h2>
			<div className="ListingRules-container">
				<div className="ListingRules__rules-column ListingRules__rules-column--house">
					<h3>House Rules</h3>
					<ul className="ListingRules__rules-column__rules">
						{props.houseRules.map((rule, idx) => {
							let link = rule?.replaceAll(" ", "_");
							if (rule?.includes("Check")) {
								link = "check-in_checkout";
							}

							return (
								<li
									key={idx}
									className="ListingRules__rules-column__rules__rule"
								>
									<img
										src={`/assets/houserules/${link}.svg`}
										alt={rule || ""}
									/>
									<span>{rule}</span>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="ListingRules__rules-column ListingRules__rules-column--health">
					<h3>Health & Safety</h3>
					<ul className="ListingRules__rules-column__rules"></ul>
					{props.healthAndSafety.map((rule, idx) => {
						const link = renderHealthImageLink(rule as string);
						return (
							<li
								key={idx}
								className="ListingRules__rules-column__rules__rule"
							>
								<img
									src={`/assets/health/${link}.svg`}
									alt={rule || ""}
								/>
								<span>
									{definitelyNotAirbnb(rule as string)}
								</span>
							</li>
						);
					})}
				</div>
				<div className="ListingRules__rules-column ListingRules__rules-column--health">
					<h3>Cancellation Policy</h3>
					<div className="ListingRules__rules-column__rules">
						<p>None!</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListingRules;
