import { NavLink } from "react-router-dom";

interface Props {
	user: any;
}

const DropdownOptionsUser = ({ user }: Props) => {
	return (
		<>
			<button className="Navbar__right__profile__dropdown__link">
				<NavLink to={`/user/${user.id}`}>
					<div>
						<span>Profile</span>
					</div>
				</NavLink>
			</button>
			<button className="Navbar__right__profile__dropdown__link">
				<NavLink to={`/trips/${user.id}`}>
					<div>
						<span>Trips</span>
					</div>
				</NavLink>
			</button>
		</>
	);
};

export default DropdownOptionsUser;
