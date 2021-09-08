import React from "react";

const Hero = () => {
	return (
		<div className="Landing__hero__content">
			<div className="Landing__hero__content__image">
				<picture>
					<source
						media="(min-width: 950px)"
						type="image/webp"
						srcSet="https://res.cloudinary.com/dcufjeb5d/image/upload/v1630378604/assets/hero-image-large.jpg"
					/>
					<source
						media="(min-width: 744px)"
						type="image/webp"
						srcSet="https://res.cloudinary.com/dcufjeb5d/image/upload/v1630378604/assets/hero-image-medium.jpg"
					/>
					<img
						src={`https://res.cloudinary.com/dcufjeb5d/image/upload/v1630378604/assets/hero-image-small.jpg`}
						alt="Silouette of man with child and dog exploring woods"
					/>
				</picture>
			</div>
			<div className="Landing__hero__content__text">
				<span>Not sure where to go?</span>
				<span>Perfect.</span>
				<button>
					<a href="">
						<span>I'm flexible</span>
					</a>
				</button>
			</div>
		</div>
	);
};

export default Hero;
