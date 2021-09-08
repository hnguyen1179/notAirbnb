import React from "react";
import data from "../../data/footer.json";
import FooterSection from "./FooterSection";
import { ReactComponent as GlobalSvg } from "../../assets/icons/globe.svg";

const Footer = () => {
	return (
		<div className="Footer">
			{data.map((sectionObj) => {
				return (
					<FooterSection key={sectionObj.title} data={sectionObj} />
				);
			})}
			<div className="Footer__meta">
				<div className="Footer__meta__language">
					<button>
						<GlobalSvg />
						<span>English (US)</span>
					</button>
				</div>
				<div className="Footer__meta__legal">
					<span>© 2022 notAirbnb, Inc.</span>
				</div>
				<div className="Footer__meta__docs">
					<span>Privacy</span>
					<span className="spacer">·</span>
					<span>Terms</span>
					<span className="spacer">·</span>
					<span>Sitemap</span>
				</div>
			</div>
		</div>
	);
};

export default Footer;
