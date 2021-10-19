import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useMemo } from "react";
import useAuthToken from "../hooks/useAuthToken";

const httpLink = createHttpLink({
	uri: process.env.REACT_APP_SERVER_URL,
});

const ApolloProviderFC: React.FC = ({ children }) => {
	const [token] = useAuthToken();

	const authLink = setContext((_, { headers }) => {
		// get auth token from cookies if it exists and sets it inside header of requests
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : "",
			},
		};
	});

	const client = useMemo(() => {
		return new ApolloClient({
			link: authLink.concat(httpLink),
			cache: new InMemoryCache({
				typePolicies: {
					Query: {
						fields: {
							me: {
								merge(existing, incoming) {
									return existing;
								},
							},
							reviewsByUserId: {
								keyArgs: ["id"],
								merge(existing = [], incoming) {
									return [...existing, ...incoming];
								},
							},
							reviewsByHostId: {
								keyArgs: ["id"],
								merge(existing = [], incoming) {
									return [...existing, ...incoming];
								},
							},
							reviewsByListingId: {
								keyArgs: ["id"],
								merge(existing = [], incoming) {
									return [...existing, ...incoming];
								},
							},
							basicSearch: {
								read(existing) {
									if (!existing) return undefined;
									// {args} wasn't returning correct offset field, and so just
									// returned the correct offset within query results
									return {
										count: existing.count,
										listings: existing.listings.slice(
											existing.offset,
											existing.offset + 10
										),
										offset: existing.offset,
									};
								},
								keyArgs: [
									"region",
									"checkIn",
									"checkOut",
									"guests",
									"tags",
									"listingType",
									"languages",
									"pets",
									"smoking",
									"superhost",
									"entire",
									"privateListing",
								],
								merge(
									existing = { count: 0, listings: [] },
									incoming,
									{ args }
								) {
									const offset = args?.offset || 0;
									const mergedListings = existing
										? existing.listings.slice(0)
										: [];

									for (
										let i = 0;
										i < incoming.listings.length;
										++i
									) {
										mergedListings[offset + i] =
											incoming.listings[i];
									}
									return {
										count: incoming.count,
										listings: mergedListings,
										offset: incoming.offset,
									};
								},
							},
						},
					},
				},
			}),
		});
	}, [authLink]);

	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export { ApolloProviderFC };
