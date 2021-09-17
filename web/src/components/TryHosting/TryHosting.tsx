import React from "react";

const TryHosting = () => {
	return (
		<div className="Landing__try-hosting__content">
			<div className="Landing__try-hosting__content__image">
				<picture>
					<source
						media="(min-width: 1440px)"
						type="image/webp"
						srcSet="https://res.cloudinary.com/dcufjeb5d/image/upload/v1631166028/assets/try-hosting-large.webp"
					/>
					<source
						media="(min-width: 744px)"
						type="image/webp"
						srcSet="https://res.cloudinary.com/dcufjeb5d/image/upload/v1630378678/assets/try-hosting-medium.jpg"
					/>
					<img
						src={`https://res.cloudinary.com/dcufjeb5d/image/upload/v1630378678/assets/try-hosting-small.jpg`}
						alt="Smiling woman lounging on sofa, posing for the camera"
					/>
				</picture>
			</div>
			<div className="Landing__try-hosting__content__text">
				<h3>Try hosting</h3>
				<span>
					Earn extra income and unlock new opportunities by sharing
					your space.
				</span>
				<button>
					<a href="">
						<span>Learn more</span>
					</a>
				</button>
			</div>
		</div>
	);
};

export default TryHosting;
