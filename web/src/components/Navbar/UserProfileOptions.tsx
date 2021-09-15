interface Props {
	user: any;
}

const UserProfileOptions = ({ user }: Props) => {
	return (
		<>
			<button className="Navbar__right__profile__dropdown__link">
				<a href={`user/${user.id}`}>
					<div>Profile</div>
				</a>
			</button>
			<button className="Navbar__right__profile__dropdown__link">
				<a href="">
					<div>Trips</div>
				</a>
			</button>
		</>
	);
};

export default UserProfileOptions;
