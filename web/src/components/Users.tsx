import React from "react";
import { gql, useQuery } from "@apollo/client";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/base";

const ALL_USERS = gql`
	query ALL_USERS {
    allUsers {
      id
      firstName
    }
	}
`;

interface User {
	id: string;
	firstName: string;
}

const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_NAME;

function Users() {
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUD_NAME,
    },
  });

	const { loading, error, data } = useQuery(ALL_USERS);

	if (loading) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;
  
  console.log(data)

	return (
		<div>
      {data.allUsers.map((user: User) => {
        const img = cld.image(`/user_avatars/${user.id}`)

				return (
          <li>
            <AdvancedImage height="100px" cldImg={img}/>
						{user.firstName}
						{user.id}
					</li>
				);
			})}
		</div>
	);
}

export default Users;
