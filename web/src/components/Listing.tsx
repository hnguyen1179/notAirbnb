import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { Cloudinary } from "@cloudinary/base";
import { AdvancedImage, placeholder } from "@cloudinary/react";
import Loading from "./Loading";

const LISTING = gql`
	query LISTING($id: String!) {
		listingById(id: $id) {
			id
			title
			city
			zipCode
			location
			region
			address
			state
			imageComments
			amenities
			languages
			host {
				id
				firstName
			}
			reviews {
				content
				author {
					id
					firstName
					dateJoined
				}
			}
		}
	}
`;

interface ListingType {
	// root type
	address: string; // String!
	amenities: Array<string | null>; // [String]!
	basicAmenities: Array<string | null>; // [String]!
	city: string; // String!
	cleaningFee: number; // Int!
	datesUnavailable: JSON; // JSONObject!
	healthAndSafety: Array<string | null>; // [String]!
	highlights: Array<string | null>; // [String]!
	hostId: string; // String!
	houseRules: Array<string | null>; // [String]!
	id: string; // String!
	imageComments: Array<string | null>; // [String]!
	languages: Array<string | null>; // [String]!
	listingDescription?: string | null; // String
	listingType: string; // String!
	location: string; // String!
	locationDescription?: string | null; // String
	numBaths: number; // Int!
	numBedrooms: number; // Int!
	numBeds: number; // Int!
	numGuests: number; // Int!
	petsRule: boolean; // Boolean!
	price: number; // Int!
	region: string; // String!
	score: number; // Float!
	scores: Array<string | null>; // [String]!
	smokingRule: boolean; // Boolean!
	state: string; // String!
	stayDescription?: string | null; // String
	street: string; // String!
	superhost: boolean; // Boolean!
	title: string; // String!
	zipCode: string; // String!
}

interface UserType {
	id: string;
	firstName: string;
	dateJoined: string;
}

interface ReviewType {
	content: string;
	author: UserType;
}

interface Props {
	id: string;
}

const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_NAME;

function Listing({ id }: Props) {
	const cld = new Cloudinary({
		cloud: {
			cloudName: CLOUD_NAME,
		},
	});

	const { loading, error, data } = useQuery(LISTING, {
		variables: { id },
	});

	if (loading)
		return (
			<div className="page-loading">
				<Loading />
			</div>
		);
	if (error) console.log(JSON.stringify(error, null, 2));
	if (error) return <p> {error.message} </p>;

	const { title, location, address, reviews, host, amenities } =
		data.listingById;

	const publicId = `host_avatars/${host.id}.svg`;
	const myImage = cld.image(publicId);

	function renderCoverImage(listing: ListingType) {
		const { region, id, imageComments } = listing;

		const images = imageComments.map((comment, idx) => {
			return `images/${region
				.replace(" ", "_")
				.toLowerCase()}/${id}/image-${idx}.jpg`;
		});

		return images.map((publicId) => {
			const image = cld.image(publicId);
			return (
				<AdvancedImage
					style={{ height: "200px", padding: "10px" }}
					cldImg={image}
					plugins={[placeholder("predominant-color")]}
				/>
			);
		});
	}
	console.log(data);

	return (
		<div>
			<div id="test">notAirbnb</div>
			<h1>{title}</h1>
			{renderCoverImage(data.listingById)}
			<h3>Address: {address}</h3>
			<h2>Location: {location}</h2>
			<ul>
				{amenities.map((amenity: string) => {
					return <li>{amenity}</li>;
				})}
			</ul>
			<h2>
				Host: {host.firstName}
				<AdvancedImage
					style={{ width: "100px" }}
					cldImg={myImage}
					plugins={[placeholder("vectorize")]}
				/>
			</h2>
			<h2>Reviews: </h2>
			<div>
				<h1>languages</h1>
				<ul>
					{data.listingById.languages &&
						data.listingById.languages.map((language: string) => {
							return <li>{language}</li>;
						})}
				</ul>
			</div>
			<ul>
				{reviews.map((review: ReviewType) => {
					const author = review.author;
					const publicId = `user_avatars/${author.id}.svg`;
					const myImage = cld.image(publicId);

					return (
						<li>
							<div>
								<AdvancedImage
									style={{ width: "50px" }}
									cldImg={myImage}
									plugins={[placeholder("blur")]}
								/>
								{author.firstName} {author.dateJoined} <br></br>
								{author.id}
							</div>
							<p className="comment-content">
								{review.content.replace("Show more", "")}
							</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default Listing;
