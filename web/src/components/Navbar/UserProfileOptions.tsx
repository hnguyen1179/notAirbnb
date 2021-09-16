import { NavLink } from "react-router-dom";

interface Props {
	user: any;
}

const UserProfileOptions = ({ user }: Props) => {
	return (
		<>
			<button className="Navbar__right__profile__dropdown__link">
				<NavLink to={`/user/${user.id}`}>
					<div>Profile</div>
				</NavLink>
			</button>
			<button className="Navbar__right__profile__dropdown__link">
				<NavLink to={`/user/${user.id}/trips`}>
					<div>Trips</div>
				</NavLink>
			</button>
		</>
	);
};

export default UserProfileOptions;
