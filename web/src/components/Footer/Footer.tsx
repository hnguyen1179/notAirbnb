import data from "../../data/footer.json";
import FooterSection from "./FooterSection";
import { ReactComponent as GlobalSvg } from "../../assets/icons/globe.svg";

const Footer = () => {
	return (
		<div className="Footer">
			<div className="FooterSection-container">
				{data.map((sectionObj) => {
					return (
						<FooterSection
							key={sectionObj.title}
							data={sectionObj}
						/>
					);
				})}
			</div>
			<div className="Footer__meta">
				<div className="Footer__meta__language">
					<button>
						<GlobalSvg />
						<span>English (US)</span>
					</button>
				</div>
				<div className="Footer__meta__legal">
					<div>© 2022 notAirbnb, Inc.</div>
				</div>
				<div className="Footer__meta__docs">
					<span className="spacer spacer--hidden">·</span>
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
