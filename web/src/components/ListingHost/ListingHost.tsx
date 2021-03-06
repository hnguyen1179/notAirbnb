import { AdvancedImage } from "@cloudinary/react";
import { Maybe } from "graphql/jsutils/Maybe";
import { useAppState } from "../../context/AppContext";
import { ReactComponent as ProtectSvg } from "../../assets/icons/protect.svg";
import Medal from "./Medal";
import { definitelyNotAirbnb } from "../../utils/definitelyNotAirbnb";
import { Link } from "react-router-dom";

interface HostPartial {
	id: string;
	firstName: string;
	medals: Maybe<string>[];
	details: Maybe<string>[];
	description?: Maybe<string>;
	dateJoined: string;
}

interface Props {
	host: Maybe<HostPartial>;
}

const ListingHost = (props: Props) => {
	const { cloudinary } = useAppState();

	return (
		<div className="ListingHost">
			<div>
				<header className="ListingHost__header">
					<Link to={`/host/${props.host?.id}`}>
						<div className="ListingHost__header__host">
							<h2>Hosted by {props.host?.firstName}</h2>
							<span>{props.host?.dateJoined}</span>
						</div>

						<div className="ListingHost__header__avatar">
							<AdvancedImage
								alt="Host avatar"
								cldImg={cloudinary.image(
									`host_avatars/${props.host?.id}`
								)}
								loading="lazy"
							/>
						</div>
					</Link>
				</header>

				<ul className="ListingHost__medals">
					{props.host?.medals.length
						? props.host.medals.map((medal, idx) => (
								<Medal key={idx} medal={medal as string} />
						  ))
						: null}
				</ul>

				<div className="ListingHost__description">
					<p>{definitelyNotAirbnb(props.host?.description || "")}</p>
				</div>
			</div>

			<div>
				<ul className="ListingHost__details">
					{props.host?.details.map((detail, idx) => (
						<li key={idx}>{detail}</li>
					))}
				</ul>

				<div className="ListingHost__contact">
					<button className="show-all-button">
						<span>Contact Host</span>
					</button>
					<div className="ListingHost__contact__disclaimer">
						<span>
							To protect your payment, never transfer money or
							communicate outside of the notAirbnb website
							or&nbsp;app.
						</span>
						<ProtectSvg />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListingHost;
